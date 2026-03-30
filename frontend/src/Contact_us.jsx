import React, { useState } from 'react';

function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    cardCount: '',
    question: ''
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 驗證必填邏輯
    if (!formData.name || !formData.cardCount) {
      setError('名字和評核卡數量必須填寫 Name and Number of assessment cards are required');
      return;
    }
    if (!formData.phone && !formData.email) {
      setError('電話和電郵至少填寫一個 Telephone or Email is required');
      return;
    }

    setError('');

    try {
      const response = await fetch("/api/sendmail.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (result.success) {
        alert("表單已提交並寄出郵件！ Form submitted and email sent!");
      } else {
        alert("寄信失敗 Mail failed：" + result.message);
      }
    } catch (err) {
      alert("系統錯誤 System Error：" + err.message);
    }
  };

  return (
    <div className="hero" id="home">
      <div className="contactus-content">
        <div className="hero-text">
          <h1>
            <span className="text-zh">聯絡我們</span>
            <span className="text-en">Contact Us</span>
          </h1>
          <p className="hero-description">
            <span className="text-zh">請直接聯絡我們索取正式申請表</span>
            <span className="text-en">Please contact us directly to retrieve the official Application Form.</span>
            <br /><span className="text-zh">對鑑定流程或提交訂單有任何疑問？歡迎聯絡我們的專業團隊。</span>
            <span className="text-en">Have questions about your submission or our grading process? Our team is here to help.</span>
            <br /><br />

          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>名字 Name<span className="required" style={{color: 'red'}}>*</span></label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label>電話 Telephone<span className="required" style={{color: 'red'}}>*</span></label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label>電郵 Email<span className="required" style={{color: 'red'}}>*</span></label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label>評核卡數量 Number of assessment cards<span className="required" style={{color: 'red'}}>*</span></label>
              <input
                type="number"
                name="cardCount"
                value={formData.cardCount}
                onChange={handleChange}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label>詳細查詢 Description of the query</label>
              <textarea
                type="text"
                name="question"
                value={formData.question}
                onChange={handleChange}
                className="form-input"
                style={{height:"200px"}}
              />
            </div>

            {error && <p className="error-message">{error}</p>}

            <button type="submit" className="btn">提交</button>
          </form>
          </p>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
