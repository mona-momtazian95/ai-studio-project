import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  signInWithPopup, 
  GoogleAuthProvider, 
  onAuthStateChanged, 
  User as FirebaseUser,
  signOut
} from "firebase/auth";
import firebaseConfig from "../../firebase-applet-config.json";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

const provider = new GoogleAuthProvider();
// Add required Calendar scopes for creating and reading calendar events
provider.addScope("https://www.googleapis.com/auth/calendar.events");
provider.addScope("https://www.googleapis.com/auth/calendar.readonly");
provider.addScope("https://www.googleapis.com/auth/gmail.send");

let isSigningIn = false;
let cachedAccessToken: string | null = null;

// Initialize auth state listener
export const initAuth = (
  onAuthSuccess?: (user: FirebaseUser, token: string) => void,
  onAuthFailure?: () => void
) => {
  return onAuthStateChanged(auth, async (user: FirebaseUser | null) => {
    if (user) {
      if (cachedAccessToken) {
        if (onAuthSuccess) onAuthSuccess(user, cachedAccessToken);
      } else if (!isSigningIn) {
        // Since Firebase token is not persisted across page reloads in memory,
        // we will prompt the user to sign-in again to authorize Google Calendar, which is standard.
        cachedAccessToken = null;
        if (onAuthFailure) onAuthFailure();
      }
    } else {
      cachedAccessToken = null;
      if (onAuthFailure) onAuthFailure();
    }
  });
};

// Start Google sign-in flow
export const googleSignIn = async (): Promise<{ user: FirebaseUser; accessToken: string } | null> => {
  try {
    isSigningIn = true;
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const apiToken = credential?.accessToken;
    if (!apiToken) {
      throw new Error("Failed to get Google OAuth access token from Firebase Auth credential");
    }

    cachedAccessToken = apiToken;
    return { user: result.user, accessToken: apiToken };
  } catch (error: any) {
    console.error("Sign-in with Google error:", error);
    throw error;
  } finally {
    isSigningIn = false;
  }
};

export const getAccessToken = (): string | null => {
  return cachedAccessToken;
};

export const handleLogout = async () => {
  await signOut(auth);
  cachedAccessToken = null;
};

/**
 * Pushes a new appointment directly onto Google Calendar
 */
export const createGoogleCalendarEvent = async (params: {
  title: string;
  description: string;
  date: string; // "YYYY-MM-DD"
  time: string; // "HH:MM"
  doctorName: string;
  treatmentName: string;
}, token: string) => {
  // ISO start and end string creation
  const startDateTime = `${params.date}T${params.time}:00`;
  
  // Calculate end time (assuming 1 hour appointment duration)
  const [hours, minutes] = params.time.split(":").map(Number);
  const endHoursStr = String((hours + 1) % 24).padStart(2, "0");
  const endDateTime = `${params.date}T${endHoursStr}:${String(minutes).padStart(2, "0")}:00`;

  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC";

  const eventPayload = {
    summary: params.title,
    description: params.description,
    start: {
      dateTime: startDateTime,
      timeZone: timeZone,
    },
    end: {
      dateTime: endDateTime,
      timeZone: timeZone,
    },
    attendees: [],
    reminders: {
      useDefault: true,
    },
  };

  const response = await fetch("https://www.googleapis.com/calendar/v3/calendars/primary/events", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(eventPayload),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Google Calendar API Error: ${response.status} - ${errorText}`);
  }

  const data = await response.json();
  return data;
};

/**
 * Sends a confirmation email to the logged-in user's Gmail using the Gmail SDK/API
 */
export const sendGoogleGmail = async (params: {
  to: string;
  subject: string;
  bodyHtml: string;
}, token: string) => {
  const emailLines = [
    `To: ${params.to}`,
    `Subject: =?utf-8?B?${btoa(unescape(encodeURIComponent(params.subject)))}?=`,
    "Content-Type: text/html; charset=utf-8",
    "MIME-Version: 1.0",
    "",
    params.bodyHtml
  ];

  const rawMessage = emailLines.join("\r\n");

  const base64Safe = btoa(unescape(encodeURIComponent(rawMessage)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");

  const response = await fetch("https://gmail.googleapis.com/gmail/v1/users/me/messages/send", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      raw: base64Safe
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Gmail API Error: ${response.status} - ${errorText}`);
  }

  return await response.json();
};
