// ==========================================
// M.4 PREP - Central Configuration File
// ==========================================

// 1. กำหนดค่า Supabase Connection
const SUPABASE_URL = 'https://jykdmzhqrcdyulztcota.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp5a2RtemhxcmNkeXVsenRjb3RhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODk4MTg0MjcsImV4cCI6MjEwNTM5NDQyN30.Cz7joFgrCPLFyAhKlUL9azLcExXsskUEoAUBd0yc99E';

// สร้าง Supabase Client (ตรวจสอบ SDK ก่อนเรียกใช้)
const _supabase = (typeof supabase !== 'undefined') 
    ? supabase.createClient(SUPABASE_URL, SUPABASE_KEY) 
    : null;

// 2. กำหนดธีม ไอคอน สี และ Keywords ของแต่ละวิชา
const SUBJECT_CONFIG = {
    'math': {
        name: 'คณิตศาสตร์',
        title: 'วิชาคณิตศาสตร์',
        desc: 'รวบรวมเนื้อหา สรุปสูตร และแนวข้อสอบวิชาคณิตศาสตร์ ม.ต้น เพื่อเตรียมสอบเข้า ม.4',
        badgeClass: 'bg-primary text-white',
        textColor: 'text-primary',
        icon: 'fa-calculator',
        bgGradient: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
        keywords: ['math', 'calc', 'algebra', 'คณิต', 'คณิตศาสตร์', 'พีชคณิต', 'เรขาคณิต', 'แคลคูลัส']
    },
    'science': {
        name: 'วิทยาศาสตร์',
        title: 'วิชาวิทยาศาสตร์',
        desc: 'สรุปเนื้อหา ฟิสิกส์ เคมี ชีววิทยา และโลกดาราศาสตร์ ครบจบในที่เดียว',
        badgeClass: 'bg-success text-white',
        textColor: 'text-success',
        icon: 'fa-flask',
        bgGradient: 'linear-gradient(135deg, #16a34a 0%, #15803d 100%)',
        keywords: ['science', 'sci', 'physics', 'chem', 'bio', 'วิทย์', 'วิทยาศาสตร์', 'ฟิสิกส์', 'เคมี', 'ชีวะ', 'ชีววิทยา', 'ดาราศาสตร์']
    },
    'english': {
        name: 'ภาษาอังกฤษ',
        title: 'วิชาภาษาอังกฤษ',
        desc: 'สรุปไวยากรณ์ (Grammar) คำศัพท์ และแนวข้อสอบ Reading / Error Identification',
        badgeClass: 'bg-danger text-white',
        textColor: 'text-danger',
        icon: 'fa-language',
        bgGradient: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)',
        keywords: ['english', 'eng', 'grammar', 'vocab', 'อังกฤษ', 'ภาษาอังกฤษ']
    },
    'thai': {
        name: 'ภาษาไทย',
        title: 'วิชาภาษาไทย',
        desc: 'หลักภาษาไทย วรรณคดี การอ่านจับใจความ และการวิเคราะห์ภาษา',
        badgeClass: 'bg-warning text-dark',
        textColor: 'text-warning',
        icon: 'fa-book-open',
        bgGradient: 'linear-gradient(135deg, #d97706 0%, #b45309 100%)',
        keywords: ['thai', 'ไทย', 'ภาษาไทย', 'วรรณคดี', 'หลักภาษา']
    },
    'society': {
        name: 'สังคมศึกษา',
        title: 'วิชาสังคมศึกษา',
        desc: 'ศาสนา หน้าที่พลเมือง เศรษฐศาสตร์ ประวัติศาสตร์ และภูมิศาสตร์',
        badgeClass: 'bg-info text-white',
        textColor: 'text-info',
        icon: 'fa-globe-asia',
        bgGradient: 'linear-gradient(135deg, #0891b2 0%, #0e7490 100%)',
        keywords: ['society', 'soc', 'history', 'geo', 'สังคม', 'สังคมศึกษา', 'ประวัติศาสตร์', 'ภูมิศาสตร์', 'เศรษฐศาสตร์', 'หน้าที่พลเมือง']
    },
    'other': {
        name: 'วิชาทั่วไป',
        title: 'วิชาทั่วไป',
        desc: 'คอร์สเรียนและบทเรียนเสริมทักษะทั่วไป',
        badgeClass: 'bg-secondary text-white',
        textColor: 'text-secondary',
        icon: 'fa-book',
        bgGradient: 'linear-gradient(135deg, #4b5563 0%, #374151 100%)',
        keywords: []
    }
};

// รองรับตัวแปรชื่อตัวพิมพ์เล็กตามโค้ดเดิมในบางหน้า
const subjectConfig = SUBJECT_CONFIG;

// 3. ฟังก์ชันตรวจจับวิชาอัจฉริยะ (ตรวจจาก Object หรือ String)
function getSubjectKey(course) {
    if (!course) return 'other';

    // กรณีส่งชื่อวิชามาเป็นข้อความโดยตรง
    if (typeof course === 'string') {
        const str = course.toLowerCase().trim();
        for (const [key, cfg] of Object.entries(SUBJECT_CONFIG)) {
            if (cfg.keywords.some(kw => str.includes(kw))) return key;
        }
        return 'other';
    }

    // กรณีส่งมาเป็น Object ข้อมูลบทเรียนจาก Supabase
    const fullText = [
        course.subject,
        course.category,
        course.title,
        course.name,
        course.description
    ].filter(Boolean).join(' ').toLowerCase();

    for (const [key, cfg] of Object.entries(SUBJECT_CONFIG)) {
        if (cfg.keywords.some(kw => fullText.includes(kw))) {
            return key;
        }
    }

    return 'other';
}

// 4. ฟังก์ชันแปลง URL วิดีโอเป็น Embed URL สำหรับ YouTube
function formatVideoUrl(url) {
    if (!url) return '';
    if (url.includes('youtube.com/watch?v=')) {
        return url.replace('watch?v=', 'embed/');
    }
    if (url.includes('youtu.be/')) {
        return url.replace('youtu.be/', 'youtube.com/embed/');
    }
    return url;
}

// 5. ฟังก์ชันบันทึกคะแนนสอบลง Supabase (เชื่อมกับ User ID ของแต่ละคนอัตโนมัติ)
async function saveExamResult(subject, topic, score, totalQuestions) {
    if (!_supabase) {
        console.error('ไม่พบการเชื่อมต่อ Supabase');
        return { success: false, error: 'Supabase not initialized' };
    }

    // ตรวจสอบว่าผู้ใช้ล็อกอินอยู่หรือไม่
    const { data: { session } } = await _supabase.auth.getSession();
    if (!session || !session.user) {
        console.warn('ผู้ใช้ยังไม่ได้เข้าสู่ระบบ ข้ามการบันทึกคะแนน');
        return { success: false, error: 'Not logged in' };
    }

    // แปลงชื่อวิชาให้เป็นคีย์มาตรฐาน (math, science, english, thai, society, other)
    const normalizedSubject = getSubjectKey(subject);

    const { data, error } = await _supabase
        .from('exam_results')
        .insert([{
            user_id: session.user.id,
            subject: normalizedSubject,
            topic: topic || 'ข้อสอบรวม',
            score: Number(score) || 0,
            total_questions: Number(totalQuestions) || 0
        }]);

    if (error) {
        console.error('บันทึกคะแนนไม่สำเร็จ:', error.message);
        return { success: false, error };
    }

    console.log('บันทึกคะแนนสอบเรียบร้อยแล้ว!');
    return { success: true, data };
}