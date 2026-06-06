import { Language } from "./types";

export const translations: Record<Language, Record<string, string>> = {
  en: {
    // Nav
    brand: "Yektai Dental Clinic",
    slogan: "Your smile is our priority",
    home: "Home",
    services: "Services",
    booking: "Book Appointment",
    invoices: "Invoice Generator",
    contactTitle: "Contact Us",
    businessCardTab: "Business Card",
    
    // Hero
    heroTitle: "Your Ultimate Smile, Crafted with Care",
    heroDesc: "Expert dental services with state-of-the-art gentle diagnostics and personalized treatments in Limassol, Cyprus.",
    bookNowCustom: "Book Online",
    viewServicesCustom: "Explore Treatments",
    experienceYears: "Over 15 Years of Excellence",
    advancedTech: "Advanced Green Equipment",
    familyAtmosphere: "Caring, Multilingual Environment",

    // Services Intro
    servicesIntroTitle: "Our Dental Specialities",
    servicesIntroDesc: "We offer complete premium dental care with reasonable pricing and a comforting spa-like treatment environment in Agiou Andreou, Limassol.",
    durationLabel: "Duration",
    priceLabel: "Price",
    startingFrom: "from",

    // Booking translations
    bookingTitle: "Schedule Your Dental Appointment",
    bookingDesc: "Select your desired treatment, choose your preferred dentist, and choose a time slot. We will confirm your session instantly.",
    fullName: "Patient's Full Name",
    phone: "Phone Number",
    email: "Email Address",
    selectTreatment: "Select Treatment Specialty",
    selectDoctor: "Choose Your Dentist",
    selectDate: "Select Appointment Date",
    selectTime: "Select Time Slot",
    additionalNotes: "Symptoms / Special Notes",
    submitBooking: "Confirm Appointment & Book",
    bookingSuccess: "Appointment Booked Successfully!",
    bookingSuccessDesc: "Your checkup session has been securely recorded. See details below and save or screenshot this card.",
    appId: "Appointment Reference ID",
    myBookings: "My Saved Appointments",
    noBookings: "You have no active appointments booked yet.",
    cancelApp: "Cancel",

    // Doctors
    drMona: "Dr. Mona Momtazian",
    drAli: "Dr. Alireza Yektai",

    // Invoice Section
    invoiceTitle: "Digital Dental Invoice Portal",
    invoiceDesc: "Generate, compute, and download legal dental invoices instantly for insurance claims, Tax reports, or personal records. Select treatments received.",
    billTo: "Invoice Bill To:",
    patientNameHolder: "Enter Patient Name",
    patientEmailHolder: "Enter Email Address",
    patientPhoneHolder: "Enter Phone Number",
    addItem: "Add Treatment Item",
    vatAmount: "Cyprus VAT (19%)",
    totalAmount: "Total Payable Amount",
    invoiceNum: "Invoice Number",
    invoiceDate: "Date of Issue",
    currency: "EUR",
    downloadInvoice: "Download PDF / Invoice Printout",
    saveInvoice: "Save Invoice Record",
    searchInvoices: "Search Saved Invoices",
    noInvoices: "No dental invoices generated yet.",
    itemDescription: "Treatment / Dental Item",
    qty: "Qty",
    unitPrice: "Unit Price (€)",

    // Business Card
    cardDownloadTitle: "Digital Dental Business Card",
    cardDownloadDesc: "Interact with the digital version of our clinic card. You can view, share, or download the physical business card image or export the clinic's digital contact (VCF).",
    downloadImage: "Save Card as PNG Image",
    downloadVcf: "Download Contact Details (vCard)",
    cardSlogan: "Your smile is our priority",
    scanToBook: "SCAN TO BOOK PREVIEW",
    addressShort: "Limassol, Cyprus",

    // Contact Information
    hoursTitle: "Clinic Working Hours",
    monFri: "Monday - Friday",
    sat: "Saturday",
    sun: "Sunday",
    closed: "Closed",
    addressTitle: "Our Location & Address",
    addressText: "Agiou Andreou 124, Limassol 3036, Cyprus",
    getDirections: "Get Directions via Google Maps",
    quickCall: "Quick Phone Line",
    quickEmail: "Email Support Desk",

    // AI Chatbot
    chatHeaderTitle: "AI Dental Assistant (Yassi)",
    chatWelcome: "Hi! I am Yassi, your dental care chatbot. I can answer questions about teeth care, treatments, cosmetic options, and pricing of Yektai Dental Clinic in any language. How can I help you have a perfect smile today?",
    chatPlaceholder: "Ask Yassi any dental questions...",
    chatErrorKey: "Chat is typing but AI Service is offline. Please configure GEMINI_API_KEY.",
    suggestPricing: "🦷 Check Treatment Prices",
    suggestHours: "🕒 What are your working hours?",
    suggestLocation: "📍 Where is the clinic in Limassol?",
    suggestBooking: "📅 How do I book an appointment?",
    footerDesc: "Premium modern dental clinic based in Limassol, Cyprus (+357 111 111). Offering expert treatment in clean, calm, spa-like dental rooms. Your smile is our priority.",
    allRightsReserved: "All Rights Reserved.",
    phoneLabel: "Phone",
    emailLabel: "Email"
  },
  el: {
    // Nav
    brand: "Οδοντιατρική Κλινική Yektai",
    slogan: "Το χαμόγελό σας είναι η προτεραιότητά μας",
    home: "Αρχική",
    services: "Υπηρεσίες",
    booking: "Κλείστε Ραντεβού",
    invoices: "Έκδοση Τιμολογίου",
    contactTitle: "Επικοινωνία",
    businessCardTab: "Επαγγελματική Κάρτα",

    // Hero
    heroTitle: "Premium Οδοντιατρική Φροντίδα στη Λεμεσό",
    heroDesc: "Καλώς ορίσατε στην Κλινική Yektai. Δημιουργούμε υγιή και λαμπερά χαμόγελα με απαλή και σύγχρονη φροντίδα.",
    bookNowCustom: "Κλείστε Online",
    viewServicesCustom: "Εξερευνήστε Θεραπείες",
    experienceYears: "Πάνω από 15 Χρόνια Αριστείας",
    advancedTech: "Προηγμένος Πράσινος Εξοπλισμός",
    familyAtmosphere: "Φιλικό, Πολύγλωσσο Περιβάλλον",

    // Services Intro
    servicesIntroTitle: "Οι Οδοντιατρικές μας Ειδικότητες",
    servicesIntroDesc: "Προσφέρουμε ολοκληρωμένη premium οδοντιατρική φροντίδα με λογικές τιμές και ένα χαλαρωτικό περιβάλλον θεραπείας στην οδό Αγίου Ανδρέου στη Λεμεσό.",
    durationLabel: "Διάρκεια",
    priceLabel: "Τιμή",
    startingFrom: "από",

    // Booking
    bookingTitle: "Προγραμματίστε το Οδοντιατρικό σας Ραντεβού",
    bookingDesc: "Επιλέξτε τη θεραπεία που επιθυμείτε, διαλέξτε τον οδοντίατρο που προτιμάτε και επιλέξτε την ώρα. Θα επιβεβαιώσουμε άμεσα τη συνεδρία σας.",
    fullName: "Ονοματεπώνυμο Ασθενούς",
    phone: "Αριθμός Τηλεφώνου",
    email: "Διεύθυνση Email",
    selectTreatment: "Επιλέξτε Οδοντιατρική Ειδικότητα",
    selectDoctor: "Επιλέξτε Οδοντίατρο",
    selectDate: "Επιλέξτε Ημερομηνία",
    selectTime: "Επιλέξτε Ώρα",
    additionalNotes: "Συμπτώματα / Ειδικές Σημειώσεις",
    submitBooking: "Επιβεβαίωση & Κράτηση Ραντεβού",
    bookingSuccess: "Το Ραντεβού Κλείστηκε με Επιτυχία!",
    bookingSuccessDesc: "Το ραντεβού σας έχει καταγραφεί με ασφάλεια. Δείτε τις λεπτομέρειες παρακάτω και αποθηκεύστε αυτήν την κάρτα.",
    appId: "Κωδικός Αναφοράς Ραντεβού",
    myBookings: "Τα Ραντεβού μου",
    noBookings: "Δεν έχετε ενεργά κλεισμένα ραντεβού ακόμα.",
    cancelApp: "Ακύρωση",

    // Doctors
    drMona: "Δρ. Μόνα Μομταζιαν",
    drAli: "Δρ. Αλιρέζα Γεκτάι",

    // Invoice Section
    invoiceTitle: "Ψηφιακό Τιμολόγιο Οδοντιατρικών Υπηρεσιών",
    invoiceDesc: "Δημιουργήστε, υπολογίστε και κατεβάστε επίσημα τιμολόγια για ασφαλιστικές απαιτήσεις, φορολογικές δηλώσεις ή προσωπικό αρχείο.",
    billTo: "Χρέωση σε:",
    patientNameHolder: "Εισαγάγετε Όνομα Ασθενούς",
    patientEmailHolder: "Εισαγάγετε Διεύθυνση Email",
    patientPhoneHolder: "Εισαγάγετε Αριθμό Τηλεφώνου",
    addItem: "Προσθήκη Οδοντιατρικής Υπηρεσίας",
    vatAmount: "ΦΠΑ Κύπρου (19%)",
    totalAmount: "Συνολικό Πληρωτέο Ποσό",
    invoiceNum: "Αριθμός Τιμολογίου",
    invoiceDate: "Ημερομηνία Έκδοσης",
    currency: "EUR",
    downloadInvoice: "Λήψη PDF / Εκτύπωση Τιμολογίου",
    saveInvoice: "Αποθήκευση Τιμολογίου",
    searchInvoices: "Αναζήτηση Αποθηκευμένων Τιμολογίων",
    noInvoices: "Δεν έχουν εκδοθεί τιμολόγια ακόμα.",
    itemDescription: "Οδοντιατρική Θεραπεία",
    qty: "Ποσ.",
    unitPrice: "Τιμή Μονάδας (€)",

    // Business Card
    cardDownloadTitle: "Ψηφιακή Επαγγελματική Κάρτα",
    cardDownloadDesc: "Αλληλεπιδράστε με την ψηφιακή έκδοση της κάρτας της κλινικής μας. Μπορείτε να δείτε, να μοιραστείτε ή να κατεβάσετε την φυσική κάρτα σαν εικόνα.",
    downloadImage: "Αποθήκευση Κάρτας ως Εικόνα PNG",
    downloadVcf: "Λήψη Στοιχείων Επαφής (vCard)",
    cardSlogan: "Το χαμόγελό σας είναι η προτεραιότητά μας",
    scanToBook: "ΣΑΡΩΣΤΕ ΓΙΑ ΚΡΑΤΗΣΗ",
    addressShort: "Λεμεσός, Κύπρος",

    // Contact Information
    hoursTitle: "Ωράριο Λειτουργίας Κλινικής",
    monFri: "Δευτέρα - Παρασκευή",
    sat: "Σάββατο",
    sun: "Κυριακή",
    closed: "Κλειστά",
    addressTitle: "Η Τοποθεσία μας",
    addressText: "Αγίου Ανδρέου 124, Λεμεσός 3036, Κύπρος",
    getDirections: "Λήψη Οδηγιών μέσω Google Maps",
    quickCall: "Γραμμή Άμεσης Επικοινωνίας",
    quickEmail: "Email Υποστήριξης",

    // AI Chatbot
    chatHeaderTitle: "AI Βοηθός Οδοντίατρου (Yassi)",
    chatWelcome: "Γεια σας! Είμαι η Yassi, η AI βοηθός της κλινικής. Μπορώ να απαντήσω στις ερωτήσεις σας για οδοντιατρικές θεραπείες, την κλινική Yektai, τις τιμές μας και τις ώρες λειτουργίας. Πώς μπορώ να σας βοηθήσω σήμερα;",
    chatPlaceholder: "Ρωτήστε τη Yassi...",
    chatErrorKey: "Η AI υπηρεσία είναι εκτός λειτουργίας. Παρακαλώ ρυθμίστε το GEMINI_API_KEY.",
    suggestPricing: "🦷 Δείτε τις Τιμές Θεραπειών",
    suggestHours: "🕒 Ποιες είναι οι ώρες λειτουργίας;",
    suggestLocation: "📍 Πού βρίσκεται η κλινική στη Λεμεσό;",
    suggestBooking: "📅 Πώς μπορώ να κλείσω ραντεβού;",
    footerDesc: "Premium σύγχρονη οδοντιατρική κλινική στη Λεμεσό, Κύπρο (+357 111 111). Προσφέρουμε εξειδικευμένες θεραπείες σε καθαρούς, ήρεμους χώρους. Το χαμόγελό σας είναι η προτεραιότητά μας.",
    allRightsReserved: "Με επιφύλαξη παντός δικαιώματος.",
    phoneLabel: "Τηλέφωνο",
    emailLabel: "Email"
  },
  ru: {
    // Nav
    brand: "Стоматология Yektai",
    slogan: "Ваша улыбка — наш приоритет",
    home: "Главная",
    services: "Услуги",
    booking: "Запись на прием",
    invoices: "Выписка счетов",
    contactTitle: "Контакты",
    businessCardTab: "Визитная карта",

    // Hero
    heroTitle: "Стоматология Премиум-Класса в Лимассоле",
    heroDesc: "Добро пожаловать в клинику Yektai. Мы создаем здоровые, сияющие улыбки с помощью бережного ухода.",
    bookNowCustom: "Записаться онлайн",
    viewServicesCustom: "Наши Услуги",
    experienceYears: "Более 15 лет превосходной работы",
    advancedTech: "Современное экологичное оборудование",
    familyAtmosphere: "Заботливая, мультиязычная атмосфера",

    // Services Intro
    servicesIntroTitle: "Наши Специализации",
    servicesIntroDesc: "Мы предоставляем полный спектр стоматологических услуг премиум-класса по доступным ценам в комфортной атмосфере на улице Агиу Андреу в Лимассоле.",
    durationLabel: "Длительность",
    priceLabel: "Цена",
    startingFrom: "от",

    // Booking
    bookingTitle: "Запись к стоматологу для всей семьи",
    bookingDesc: "Выберите процедуру, предпочтительного врача и удобное время. Мы мгновенно подтвердим вашу запись.",
    fullName: "Имя и Фамилия пациента",
    phone: "Номер телефона",
    email: "Адрес электронной почты",
    selectTreatment: "Выберите Процедуру",
    selectDoctor: "Выберите Врача",
    selectDate: "Выберите Дату",
    selectTime: "Выберите Время",
    additionalNotes: "Симптомы / Особые пометки",
    submitBooking: "Подтвердить запись на прием",
    bookingSuccess: "Вы успешно записаны!",
    bookingSuccessDesc: "Ваш визит зафиксирован. Ознакомьтесь с деталями ниже или сохраните карточку.",
    appId: "Идентификатор записи",
    myBookings: "Мои Записи",
    noBookings: "У вас пока нет активных записей.",
    cancelApp: "Отмена",

    // Doctors
    drMona: "Д-р Мона Момтазиан",
    drAli: "Д-р Алиреза Ектаи",

    // Invoice Section
    invoiceTitle: "Сервис Выписки Счетов",
    invoiceDesc: "Создавайте, рассчитывайте и загружайте готовые медицинские счета для страховых компаний, налогового учета или личного архива.",
    billTo: "Счет выписан на:",
    patientNameHolder: "Введите имя пациента",
    patientEmailHolder: "Введите адрес эл. почты",
    patientPhoneHolder: "Введите телефон",
    addItem: "Добавить услугу в чек",
    vatAmount: "НДС Кипра (19%)",
    totalAmount: "Итого к оплате",
    invoiceNum: "Номер счета",
    invoiceDate: "Дата выпуска",
    currency: "EUR",
    downloadInvoice: "Скачать PDF / Печать счета",
    saveInvoice: "Сохранить счет",
    searchInvoices: "Поиск по сохраненным счетам",
    noInvoices: "Счетов еще не создано.",
    itemDescription: "Название услуги",
    qty: "Кол-во",
    unitPrice: "Цена за ед. (€)",

    // Business Card
    cardDownloadTitle: "Цифровая Визитная Карточка",
    cardDownloadDesc: "Интерактивная версия нашей визитки. Вы можете просмотреть, поделиться или скачать визитку в формате PNG.",
    downloadImage: "Сохранить визитку в формате PNG",
    downloadVcf: "Скачать контакты (vCard)",
    cardSlogan: "Ваша улыбка — наш приоритет",
    scanToBook: "СКАНИРУЙТЕ ДЛЯ ЗАПИСИ",
    addressShort: "Лимассол, Кипр",

    // Contact Information
    hoursTitle: "Время Работы Клиники",
    monFri: "Понедельник - Пятница",
    sat: "Суббота",
    sun: "Воскресенье",
    closed: "Закрыто",
    addressTitle: "Наш Адрес в Лимассоле",
    addressText: "Agiou Andreou 124, Limassol 3036, Cyprus",
    getDirections: "Проложить маршрут в Google Maps",
    quickCall: "Быстрый звонок в клинику",
    quickEmail: "Написать нам письмо",

    // AI Chatbot
    chatHeaderTitle: "ИИ-Ассистент стоматолога (Ясси)",
    chatWelcome: "Здравствуйте! Я Ясси, ваш интерактивный ИИ-помощник. Отвечу на любые вопросы о лечении зубов, чистке, ценах в клинике Yektai и помогу записаться. На каком языке вам удобно общаться?",
    chatPlaceholder: "Задайте вопрос Ясси...",
    chatErrorKey: "Ошибка подключения к ИИ. Пожалуйста, настройте GEMINI_API_KEY в панели Secrets.",
    suggestPricing: "🦷 Цены на лечение",
    suggestHours: "🕒 Время работы клиники",
    suggestLocation: "📍 Где вы находитесь в Лимассоле?",
    suggestBooking: "📅 Как записаться на прием?",
    footerDesc: "Премиальная современная стоматологическая клиника в Лимассоле, Кипр (+357 111 111). Экспертное лечение в чистых, спокойных кабинетах. Ваша улыбка — наш приоритет.",
    allRightsReserved: "Все права защищены.",
    phoneLabel: "Телефон",
    emailLabel: "Эл. почта"
  },
  tr: {
    // Nav
    brand: "Yektai Diş Kliniği",
    slogan: "Gülüşünüz önceliğimizdir",
    home: "Anasayfa",
    services: "Hizmetler",
    booking: "Randevu Al",
    invoices: "Fatura Oluşturucu",
    contactTitle: "İletişim",
    businessCardTab: "Kartvizit",
    
    // Hero
    heroTitle: "Özenle Tasarlanmış Sağlıklı Gülüşler",
    heroDesc: "Kıbrıs, Limasol'da en son teknoloji hassas teşhisler ve kişiselleştirilmiş tedavilerle uzman diş hekimliği hizmetleri.",
    bookNowCustom: "Online Randevu",
    viewServicesCustom: "Tedavileri Keşfet",
    experienceYears: "15 Yıldan Fazla Mükemmellik",
    advancedTech: "Gelişmiş Çevre Dostu Ekipmanlar",
    familyAtmosphere: "Şefkatli, Çok Dilli Ortam",

    // Services Intro
    servicesIntroTitle: "Diş Uzmanlık Alanlarımız",
    servicesIntroDesc: "Agiou Andreou, Limasol'daki konforlu spa benzeri tedavi ortamımızda uygun fiyatlarla eksiksiz ve premium diş bakımı sunuyoruz.",
    durationLabel: "Süre",
    priceLabel: "Fiyat",
    startingFrom: "itibaren",

    // Booking translations
    bookingTitle: "Diş Randevunuzu Planlayın",
    bookingDesc: "İstediğiniz tedaviyi seçin, tercih ettiğiniz diş hekimini belirleyin ve bir zaman dilimi seçin. Randevunuzu anında onaylayacağız.",
    fullName: "Hastanın Tam Adı",
    phone: "Telefon Numarası",
    email: "E-posta Adresi",
    selectTreatment: "Tedavi Uzmanlığı Seçin",
    selectDoctor: "Diş Hekiminizi Seçin",
    selectDate: "Randevu Tarihini Seçin",
    selectTime: "Zaman Dilimini Seçin",
    additionalNotes: "Belirtiler / Özel Notlar",
    submitBooking: "Randevuyu Onayla ve Rezerve Et",
    bookingSuccess: "Randevu Başarıyla Alındı!",
    bookingSuccessDesc: "Kontrol seansınız güvenli bir şekilde kaydedildi. Detayları aşağıda görebilir ve bu kartı kaydedebilir veya ekran görüntüsünü alabilirsiniz.",
    appId: "Randevu Referans Kimliği",
    myBookings: "Kayıtlı Randevularım",
    noBookings: "Henüz aktif randevunuz bulunmamaktadır.",
    cancelApp: "İptal Et",

    // Doctors
    drMona: "Dr. Mona Momtazian",
    drAli: "Dr. Alireza Yektai",

    // Invoice Section
    invoiceTitle: "Dijital Diş Faturası Portalı",
    invoiceDesc: "Sigorta talepleri, vergi raporları veya kişisel kayıtlar için yasal diş faturalarını anında oluşturun, hesaplayın ve indirin. Alınan tedavileri seçin.",
    billTo: "Fatura Alıcısı:",
    patientNameHolder: "Hasta Adını Girin",
    patientEmailHolder: "E-posta Adresini Girin",
    patientPhoneHolder: "Telefon Numarasını Girin",
    addItem: "Tedavi Ögesi Ekle",
    vatAmount: "Kıbrıs KDV (%19)",
    totalAmount: "Toplam Ödenecek Tutar",
    invoiceNum: "Fatura Numarası",
    invoiceDate: "Düzenleme Tarihi",
    currency: "EUR",
    downloadInvoice: "PDF İndir / Fatura Çıktısı Al",
    saveInvoice: "Fatura Kaydını Kaydet",
    searchInvoices: "Kayıtlı Faturalarda Ara",
    noInvoices: "Henüz oluşturulmuş diş faturası yok.",
    itemDescription: "Tedavi / Diş Hizmeti",
    qty: "Adet",
    unitPrice: "Birim Fiyatı (€)",

    // Business Card
    cardDownloadTitle: "Dijital Diş Hekimi Kartviziti",
    cardDownloadDesc: "Klinik kartımızın dijital versiyonu ile etkileşime geçin. Fiziksel kartvizit resmini görüntüleyebilir, paylaşabilir veya indirebilir ya da kliniğin dijital iletişim bilgilerini (VCF) dışa aktarabilirsiniz.",
    downloadImage: "Kartı PNG Resmi Olarak Kaydet",
    downloadVcf: "Kişi Bilgilerini İndir (vCard)",
    cardSlogan: "Gülüşünüz önceliğimizdir",
    scanToBook: "RANDEVU ÖNİZLEMESİ İÇİN TARAYIN",
    addressShort: "Limasol, Kıbrıs",

    // Contact Information
    hoursTitle: "Klinik Çalışma Saatleri",
    monFri: "Pazartesi - Cuma",
    sat: "Cumartesi",
    sun: "Pazar",
    closed: "Kapalı",
    addressTitle: "Konumumuz ve Adresimiz",
    addressText: "Agiou Andreou 124, Limasol 3036, Kıbrıs",
    getDirections: "Google Maps ile Yol Tarifi Al",
    quickCall: "Hızlı Telefon Hattı",
    quickEmail: "E-posta Destek Masası",

    // AI Chatbot
    chatHeaderTitle: "Yapay Zeka Diş Asistanı (Yassi)",
    chatWelcome: "Merhaba! Ben Yassi, diş bakımı sohbet robotunuz. Diş bakımı, tedaviler, estetik seçenekler ve Yektai Diş Kliniği fiyatları hakkındaki sorularınızı her dilde cevaplayabilirim. Bugün mükemmel bir gülüşe sahip olmanıza nasıl yardımcı olabilirim?",
    chatPlaceholder: "Yassi'ye diş sağlığıyla ilgili sorular sorun...",
    chatErrorKey: "Yazıyor ancak AI servisi çevrimdışı. Lütfen GEMINI_API_KEY ayarını yapın.",
    suggestPricing: "🦷 Tedavi Fiyatlarını Kontrol Et",
    suggestHours: "🕒 Çalışma saatleriniz nedir?",
    suggestLocation: "📍 Klinik Limasol'da nerede?",
    suggestBooking: "📅 Randevu nasıl alabilirim?",
    footerDesc: "Limasol, Kıbrıs'ta bulunan premium modern diş kliniği (+357 111 111). Temiz, sakin, spa benzeri diş odalarında uzman tedaviler sunuyoruz. Gülüşünüz önceliğimizdir.",
    allRightsReserved: "Tüm Hakları Saklıdır.",
    phoneLabel: "Telefon",
    emailLabel: "E-posta"
  },
  hy: {
    // Nav
    brand: "Յեկտաի Ատամնաբուժական Կլինիկա",
    slogan: "Ձեր ժպիտը մեր առաջնահերթությունն է",
    home: "Գլխավոր",
    services: "Ծառայություններ",
    booking: "Ամրագրել Այցելություն",
    invoices: "Հաշիվների Գեներատոր",
    contactTitle: "Կապ",
    businessCardTab: "Այցեքարտ",
    
    // Hero
    heroTitle: "Ձեր կատարյալ ժպիտը՝ ստեղծված սիրով",
    heroDesc: "Մասնագիտական ատամնաբուժական ծառայություններ ժամանակակից ախտորոշմամբ և անհատական մոտեցմամբ Լիմասոլում, Կիպրոս։",
    bookNowCustom: "Ամրագրել Օնլայն",
    viewServicesCustom: "Ուսումնասիրել Բուժումները",
    experienceYears: "Ավելի քան 15 տարվա փորձառություն",
    advancedTech: "Ժամանակակից էկոլոγիապես մաքուր սարքավորումներ",
    familyAtmosphere: "Հոգատար, բազմալեզու միջավայր",

    // Services Intro
    servicesIntroTitle: "Մեր Ատամնաբուժական Մասնագիտացումները",
    servicesIntroDesc: "Մենք առաջարկում ենք բարձրորակ ատամնաբուժական խնամք մատչելի գներով Լիմասոլի հարմարավետ միջավայրում։",
    durationLabel: "Տևողություն",
    priceLabel: "Արժեք",
    startingFrom: "սկսած",

    // Booking
    bookingTitle: "Պլանավորեք Ձեր Ատամնաբուժական Այցելությունը",
    bookingDesc: "Ընտրեք Ձեր նախընտրած բուժումը, բժշկին և հարմար ժամը։ Մենք անմիջապես կհաստատենք Ձեր այցելությունը։",
    fullName: "Պացիենտի Ամբողջական Անունը",
    phone: "Հեռախոսահամար",
    email: "Էլ. Փոստի Հասցե",
    selectTreatment: "Ընտրեք Բուժման Մասնագիտացումը",
    selectDoctor: "Ընտրեք Ձեր Ատամնաբույժին",
    selectDate: "Ընտրեք Այցելության Օրը",
    selectTime: "Ընտրեք Ժամը",
    additionalNotes: "Ախտանիշներ / Հատուկ նշումներ",
    submitBooking: "Հաստատել Այցելությունը և Ամրագրել",
    bookingSuccess: "Այցելությունը հաջողությամբ ամրագրվեց:",
    bookingSuccessDesc: "Ձեր այցելությունը հաջողությամբ գրանցվել է։ Տեսեք մանրամասները ստորև և պահպանեք այս քարտը։",
    appId: "Այցելության Կոդը",
    myBookings: "Իմ Ամրագրումները",
    noBookings: "Դուք դեռևս չունեք ակտիվ ամրագրումներ։",
    cancelApp: "Չեղարկել",

    // Doctors
    drMona: "Դր. Մոնա Մոմտազիան",
    drAli: "Դր. Ալիրեզա Յեկտաի",

    // Invoice Section
    invoiceTitle: "Ատամնաբուժական հաշիվների թվային պորտալ",
    invoiceDesc: "Ակնթարթորեն ստեղծեք, հաշվարկեք և ներբեռնեք պաշտոնական ատամնաբուժական հաշիվներ ապահովագրության կամ անձնական արխիվի համար։",
    billTo: "Հաշիվը ներկայացված է՝",
    patientNameHolder: "Մուտքագրեք պացիենտի անունը",
    patientEmailHolder: "Մուտքագրեք էլ. փոստը",
    patientPhoneHolder: "Մուտքագրեք հեռախոսահամարը",
    addItem: "Ավելացնել Ծառայություն",
    vatAmount: "Կիպրոսի ԱԱՀ (19%)",
    totalAmount: "Ընդհանուր վճարման ենթակա գումար",
    invoiceNum: "Հաշվի Համար",
    invoiceDate: "Տրման Ամսաթիվ",
    currency: "EUR",
    downloadInvoice: "Ներբեռնել PDF / Տպել Հաշիվը",
    saveInvoice: "Պահպանել Հաշիվը",
    searchInvoices: "Փնտրել Պահպանված Հաշիվները",
    noInvoices: "Դեռևս հաշիվներ չեն ստեղծվել։",
    itemDescription: "Ծառայություն / Ատամնաբուժական աշխատանք",
    qty: "Քանակ",
    unitPrice: "Միավորի Արժեքը (€)",

    // Business Card
    cardDownloadTitle: "Ատամնաբուժական Թվային Այցեքարտ",
    cardDownloadDesc: "Դիտեք, տարածեք կամ ներբեռնեք մեր կլինಿಕայի այցեքարտի պատկերը կամ արտահանեք կլինಿಕայի թվային կոնտակտը (vCard):",
    downloadImage: "Պահպանել այցեքարտը որպես PNG",
    downloadVcf: "Ներբեռնել կոնտակտային տվյալները (vCard)",
    cardSlogan: "Ձեր ժպիտը մեր առաջնահերթությունն է",
    scanToBook: "ՍԿԱՆԱՎՈՐԵԼ ԱՄՐԱԳՐԵԼՈՒ ՀԱՄԱՐ",
    addressShort: "Լիմասոլ, Կիպրոս",

    // Contact Information
    hoursTitle: "Կլինիկայի Աշխատանքային Ժամերը",
    monFri: "Երկուշաբթի - Ուրբαթ",
    sat: "Շաբաթ",
    sun: "Կիրակի",
    closed: "Փակ է",
    addressTitle: "Մեր Հասցեն Լիմասոլում",
    addressText: "Agiou Andreou 124, Limassol 3036, Cyprus",
    getDirections: "Ստանալ Ուղղություն Google Maps-ով",
    quickCall: "Արագ Հեռախոսագիծ",
    quickEmail: "Էլ. Փոստի Աջակցություն",

    // AI Chatbot
    chatHeaderTitle: "AI Ատամնաբուժական Օգնական (Yassi)",
    chatWelcome: "Ողջույն, ես Յասսին եմ՝ ատամնաբուժական կլինիկայի AI օգնականը։ Ես կարող եմ պատասխանել ատամների խնամքի, բուժումների, գների և Յեկտաի կլինիկայի մասին ցանկացած հարցի ցանկացած լեզվով։ Ինչպե՞ս կարող եմ օգնել ձեզ այսօր։",
    chatPlaceholder: "Հարցրեք Յասսիին...",
    chatErrorKey: "AI ծառայությունը ժամանակավորապես անհասանելի է: Խնդրում ենք կարգավորել GEMINI_API_KEY-ը:",
    suggestPricing: "🦷 Ստուգել Գները",
    suggestHours: "🕒 Որո՞նք են աշխատանքային ժամերը:",
    suggestLocation: "📍 Որտե՞ղ է գտնվում կլινիկան Լիմասոլում:",
    suggestBooking: "📅 Ինչպե՞ս կարող եم ամրագրել այցելություն:",
    footerDesc: "Պրեմիում դասի ժամանակակից ատամնաբուժական կլինիկա Լիմասոլում, Կիպրոս (+357 111 111)։ Մասնագիտական բուժում մաքուր և հանգիստ միջավայրում։ Ձեր ժպիտը մեր առաջնահերթությունն է։",
    allRightsReserved: "Բոլոր իրավունքները պաշտպանված են։",
    phoneLabel: "Հեռախոս",
    emailLabel: "Էլ. Փոստ"
  }

};

export const TREATMENTS_DATA: Record<string, any>[] = [
  {
    id: "consultation",
    category: {
      en: "General Dentistry",
      el: "Γενική Οδοντιατρική",
      ru: "Общая стоматология",
      tr: "Genel Diş Hekimliği",
      hy: "Ընդհանուր Ստոմատոլոգիա"
    },
    name: {
      en: "Checkup & Comprehensive Consultation",
      el: "Έλεγχος & Ολοκληρωμένη Διάγνωση",
      ru: "Осмотр и подробная консультация",
      tr: "Kontrol ve Kapsamlı Konsültasyon",
      hy: "Ստուգում և համապարփակ խորհրդատվություն"
    },
    price: 50,
    duration: "20-30 min",
    description: {
      en: "Full examination of teeth, gums, and oral hygiene, with treatment planning and digital camera pre-assessment. Free checkup for children under 12.",
      el: "Πλήρης εξέταση των δοντιών, των ούλων και της στοματικής υγιεινής, με σχεδιασμό θεραπείας. Δωρεάν έλεγχος για παιδιά κάτω των 12 ετών.",
      ru: "Полный осмотр зубов, десен и гигиены полости рта, составление плана лечения. Бесплатный осмотр для детей до 12 лет.",
      tr: "Dişlerin, diş etlerinin ve ağız hijyeninin tam muayenesi, tedavi planlaması ve dijital kamera ön değerlendirmesi ile. 12 yaşından küçük çocuklar için ücretsiz kontrol.",
      hy: "Ատամների, լնդերի և բերանի խոռոչի հիգիենայի ամբողջական հետազոտություն, բուժման պլանավորում: Մինչև 12 տարեկան երեխաների համար անվճար ստուգում:"
    }
  },
  {
    id: "cleaning",
    category: {
      en: "General Dentistry",
      el: "Γενική Οδοντιατρική",
      ru: "Общая стоматология",
      tr: "Genel Diş Hekimliği",
      hy: "Ընդհանուր Ստոմատոլոգիա"
    },
    name: {
      en: "Ultrasonic Scale and Polish (Cleaning)",
      el: "Καθαρισμός με Υπερήχους & Γυάλισμα",
      ru: "Ультразвуковая чистка и полировка",
      tr: "Ultrasonik Diş Taşı Temizliği ve Parlatma",
      hy: "Ուլտրաձայնային մաքրում և փայլեցում"
    },
    price: 70,
    duration: "45 min",
    description: {
      en: "Professional cleaning with high-precision ultrasonic scaler to remove tartar, plaque and surface stains, finished with dynamic air-flow polishing.",
      el: "Επαγγελματικός καθαρισμός με υπέρηχους ακριβείας για την αφαίρεση πέτρας και πλάκας, και γυάλισμα με σודה airflow.",
      ru: "Профессиональное удаление зубного камня и налета с помощью ультразвука, полировка пастой и бережное очищение Air-Flow.",
      tr: "Tartar, plak ve yüzey lekelerini temizlemek için yüksek hassasiyetli ultrasonik ölçekleyici ile profesyonel temizlik, dinamik hava akımı (airflow) parlatma ile tamamlanır.",
      hy: "Պրոֆեսիոնալ մաքրում բարձր ճշգրտության ուլտրաձայնային սարքով՝ ատամնաքարերի և փառի հեռացման համար, որն ավարտվում է airflow փայլեցմամբ:"
    }
  },
  {
    id: "whitening",
    category: {
      en: "Cosmetic Dentistry",
      el: "Αισθητική Οδοντιατρική",
      ru: "Косметическая стоматология",
      tr: "Estetik Diş Hekimliği",
      hy: "Էսթետիկ Ստոմատոլոգիա"
    },
    name: {
      en: "In-Office Zoom Laser Teeth Whitening",
      el: "Λεύκανση Δοντιών με Laser στο Ιατρείο",
      ru: "Кабинетное лазерное отбеливание Zoom",
      tr: "Klinik Tipi Zoom Lazer Diş Beyazlatma",
      hy: "Zoom լազերային ատամների սպիտակեցում կլինիկայում"
    },
    price: 250,
    duration: "60-70 min",
    description: {
      en: "Premium clinical gel whitening activated by specialized LED light, delivering up to 8 shades brighter results safely in a single session.",
      el: "Κλινική λεύκανση υψηλής ποιότητας με ενεργοποίηση από ειδικό φως LED, για δόντια έως 8 τόνους πιο λευκά σε μία μόνο συνεδρία.",
      ru: "Отбеливание зубов премиальной световой системой за одно посещение. Осветление до 8 тонов без вреда для эмали.",
      tr: "Tek bir seansta güvenle 8 tona kadar daha parlak sonuçlar sunan, özel LED ışığı ile etkinleştirilen premium klinik jel beyazlatma.",
      hy: "Պրեմիում դասի կլինիկական գելով սպիտակեցում՝ ակտիվացված հատուկ LED լույսով, որն ապահովում է մինչև 8 երանգով ավելի սպիտակ արդյունք մեկ այցով:"
    }
  },
  {
    id: "veneer",
    category: {
      en: "Cosmetic Dentistry",
      el: "Αισθητική Οδοντιατρική",
      ru: "Косметическая стоматология",
      tr: "Estetik Diş Hekimliği",
      hy: "Էսթետիկ Ստոմատոլոգիա"
    },
    name: {
      en: "Premium Porcelain E-max Veneer",
      el: "Όψη Πορσελάνης Premium E-max",
      ru: "Винир премиум-класса E-max",
      tr: "Premium Porselen E-max Lamine Kaplama",
      hy: "Պրեմիում դասի E-max կերամիկական վինիր"
    },
    price: 400,
    duration: "2 sessions",
    description: {
      en: "Custom-crafted thin ceramic veneers carefully bonded to the front teeth, providing flawless custom shape, symmetry, and ideal Hollywood shade.",
      el: "Λεπτές όψεις πορσελάνης E-max κατασκευασμένες για Flawless σχήμα, συμμετρία και ιδανικό λευκό για το δικό σας χαμόγελο.",
      ru: "Ультратонкие фарфоровые накладки германского качества, создающие безупречную форму, голливудский цвет и форму зуба.",
      tr: "Ön dişlere özenle yapıştırılan, kusursuz özel şekil, simetri ve ideal Hollywood beyazlığı sağlayan özel tasarım ince seramik lamine kaplamalar.",
      hy: "Ատամների առջևի մասին ամրացվող բարակ կերամիկական վինիրներ, որոնք ապահովում են կատարյալ ձև, սիմետրիա և հոլիվուդյան ժպիտ:"
    }
  },
  {
    id: "implant",
    category: {
      en: "Implantology",
      el: "Εμφυτευματολογία",
      ru: "Имплантология",
      tr: "İmplantoloji",
      hy: "Իմպլանտոլոգիա"
    },
    name: {
      en: "Titanium Dental Implant (Single)",
      el: "Οδοντικό Εμφύτευμα Τιτανίου (Μονό)",
      ru: "Стальной титановый имплантат",
      tr: "Titanyum Diş İmplantı (Tek Diş)",
      hy: "Տիտանե ատամնաբուժական իմպլանտ (մեկ հատ)"
    },
    price: 900,
    duration: "3-4 months",
    description: {
      en: "Premium titanium bio-compatible screw acting as artificial root, completed with custom abutment and zirconium crown for life-long durability.",
      el: "Premium βιοσυμβατή βίδα τιτανίου που λειτουργεί ως τεχνητή ρίζα, ολοκληρωμένη με εξατομικευμένη στεφάνη ζιρκονίου.",
      ru: "Качественный титановый биосовместимый винт европейского производства, служащий корнем зуба с последующей коронкой.",
      tr: "Yapay kök görevi gören, ömür boyu dayanıklılık için özel abutment ve zirkonyum kuron ile tamamlanan biyolojik olarak uyumlu tıbbi titanyum vida.",
      hy: "Պրեմիում դասի տիտանե կենսահամատեղելի պտուտակ, որը գործում է որպես արհեստական արմատ, համալրված ցիրկոնե պսակով՝ ցմահ երաշխիքով:"
    }
  },
  {
    id: "invisalign",
    category: {
      en: "Orthodontics",
      el: "Ορθοδοντική",
      ru: "Ортодонтия",
      tr: "Ortodonti",
      hy: "Օրթոդոնտիա"
    },
    name: {
      en: "Invisalign Clear Aligners Treatment",
      el: "Διάφανοι Ορθοδοντικοί Νάρθηκες Invisalign",
      ru: "Прозрачные элайнеры Invisalign",
      tr: "Invisalign Şeffaf Plak Tedavisi",
      hy: "Invisalign թափանցիկ էլայններով բուժում"
    },
    price: 2200,
    duration: "6-12 months",
    description: {
      en: "Virtually invisible, comfortable smart track clear aligners to correct crowding and misalignment, fully removable for eating and hygiene.",
      el: "Σχεδόν αόρατοι, άνετοι διάφανοι νάρθηκες SmartTrack για τη διόρθωση του χαμογέλου. Πλήρως αφαιρούμενοι.",
      ru: "Практически незаметные, гигиеничные прозрачные каппы для комфортного исправления прикуса. Снимаются перед едой.",
      tr: "Çapraşıklıkları ve hizalama sorunlarını düzeltmek için neredeyse görünmez, rahat akıllı şeffaf plaklar, yemek ve hijyen için tamamen çıkarılabilir.",
      hy: "Փաստացի անտեսանելի, հարմարավետ թափանցิก էլայններ՝ ատամների ծռությունը շտկելու համար, ուտելիս և լվացվելիս հեշտությամբ հանվող:"
    }
  }
];

export const WORK_HOURS = [
  { day: "monFri", time: "09:00 - 18:00" },
  { day: "sat", time: "09:00 - 14:00" },
  { day: "sun", time: "closed" }
];
