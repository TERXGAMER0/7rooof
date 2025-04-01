const express = require('express');
const path = require('path');
const fs = require('fs'); // لاستعمال ملفات النظام

const app = express();
const port = process.env.PORT || 3000;

// قراءة بيانات JSON من الطلبات
app.use(express.json());

// تقديم الملفات الثابتة من مجلد public فقط
app.use(express.static(path.join(__dirname, 'public')));

// إنشاء Endpoint لتحميل المحتوى الكامل
app.get('/getFullContent', (req, res) => {
  // تحديد مسار الملف الكبير (الذي يحتوي على الكود الكامل)
  const filePath = path.join(__dirname, 'fullCode.html');
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('خطأ في قراءة الملف:', err);
      return res.status(500).send('حدث خطأ في تحميل المحتوى.');
    }
    // إرسال المحتوى إلى العميل
    res.send(data);
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
