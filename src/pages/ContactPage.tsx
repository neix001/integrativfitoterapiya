import React, { useState } from 'react';
import { Send, MessageCircle, Mail, Phone, MapPin } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { t } from '../data/translations';
import { ChatMessage } from '../types';

const ContactPage: React.FC = () => {
  const { language } = useLanguage();
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);

  const handleSendMessage = () => {
    if (!message.trim()) return;

    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: message,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString(),
      senderName: 'You'
    };

    setChatMessages(prev => [...prev, userMessage]);

    // Simulate support response
    setIsTyping(true);
    setTimeout(() => {
      const responses = {
        en: [
          "Thank you for reaching out! How can I help you today?",
          "I'm here to assist you with any questions about our nutrition programs.",
          "Let me help you find the best nutrition solution for your needs.",
          "Thanks for your message! Our nutrition experts will get back to you shortly."
        ],
        az: [
          "Müraciət etdiyiniz üçün təşəkkür edirik! Bu gün sizə necə kömək edə bilərəm?",
          "Qida proqramlarımız haqqında hər hansı sualınızla sizə kömək etmək üçün buradayam.",
          "Ehtiyaclarınız üçün ən yaxşı qida həllini tapmağa kömək edim.",
          "Mesajınız üçün təşəkkür edirik! Qida ekspertlərimiz tezliklə sizinlə əlaqə saxlayacaq."
        ],
        ru: [
          "Спасибо за обращение! Как я могу помочь вам сегодня?",
          "Я готов помочь вам с любыми вопросами о наших программах питания.",
          "Позвольте мне помочь найти лучшее решение по питанию для ваших потребностей.",
          "Спасибо за ваше сообщение! Наши эксперты по питанию скоро свяжутся с вами."
        ]
      };

      const supportMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: responses[language][Math.floor(Math.random() * responses[language].length)],
        sender: 'support',
        timestamp: new Date().toLocaleTimeString(),
        senderName: 'Support Team'
      };

      setChatMessages(prev => [...prev, supportMessage]);
      setIsTyping(false);
    }, 2000);

    setMessage('');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {t('contact.title', language)}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {language === 'en' && 'Get in touch with our nutrition experts. We\'re here to help you on your health journey.'}
            {language === 'az' && 'Qida ekspertlərimizlə əlaqə saxlayın. Sağlamlıq səyahətinizdə sizə kömək etmək üçün buradayıq.'}
            {language === 'ru' && 'Свяжитесь с нашими экспертами по питанию. Мы здесь, чтобы помочь вам в вашем путешествии к здоровью.'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {language === 'en' && 'Get in Touch'}
                {language === 'az' && 'Əlaqə Saxlayın'}
                {language === 'ru' && 'Свяжитесь с Нами'}
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                    <Mail className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                    <p className="text-gray-600">info@integfito.com</p>
                    <p className="text-gray-600">support@integfito.com</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                    <Phone className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {language === 'en' ? 'Phone' : language === 'az' ? 'Telefon' : 'Телефон'}
                    </h3>
                    <p className="text-gray-600">+994 (55) 123-4567</p>
                    <p className="text-gray-600">+994 (55) 987-6543</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {language === 'en' ? 'Address' : language === 'az' ? 'Ünvan' : 'Адрес'}
                    </h3>
                    <p className="text-gray-600">
                      {language === 'en' && 'Baku, Azerbaijan'}
                      {language === 'az' && 'Bakı, Azərbaycan'}
                      {language === 'ru' && 'Баку, Азербайджан'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Office Hours */}
              <div className="mt-8 p-6 bg-gray-50 rounded-xl">
                <h3 className="font-semibold text-gray-900 mb-3">
                  {language === 'en' ? 'Office Hours' : language === 'az' ? 'İş Saatları' : 'Часы Работы'}
                </h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>{language === 'en' ? 'Monday - Friday' : language === 'az' ? 'Bazar ertəsi - Cümə' : 'Понедельник - Пятница'}</span>
                    <span>9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{language === 'en' ? 'Saturday' : language === 'az' ? 'Şənbə' : 'Суббота'}</span>
                    <span>10:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{language === 'en' ? 'Sunday' : language === 'az' ? 'Bazar' : 'Воскресенье'}</span>
                    <span>{language === 'en' ? 'Closed' : language === 'az' ? 'Bağlı' : 'Закрыто'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Live Chat */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              {/* Chat Header */}
              <div className="bg-green-600 p-6">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-white bg-opacity-20 rounded-xl flex items-center justify-center">
                    <MessageCircle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">
                      {t('contact.chat', language)}
                    </h2>
                    <p className="text-green-100">
                      {language === 'en' && 'Chat with our nutrition experts'}
                      {language === 'az' && 'Qida ekspertlərimizlə söhbət edin'}
                      {language === 'ru' && 'Общайтесь с нашими экспертами по питанию'}
                    </p>
                  </div>
                  <div className="ml-auto">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-green-100 text-sm">
                        {language === 'en' ? 'Online' : language === 'az' ? 'Onlayn' : 'В сети'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="h-96 overflow-y-auto p-6 space-y-4">
                {chatMessages.length === 0 && (
                  <div className="text-center py-8">
                    <MessageCircle className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">
                      {language === 'en' && 'Start a conversation with our support team'}
                      {language === 'az' && 'Dəstək komandamızla söhbətə başlayın'}
                      {language === 'ru' && 'Начните разговор с нашей командой поддержки'}
                    </p>
                  </div>
                )}

                {chatMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                        msg.sender === 'user'
                          ? 'bg-green-600 text-white'
                          : 'bg-gray-100 text-gray-900'
                      }`}
                    >
                      {msg.senderName && (
                        <p className={`text-xs mb-1 ${
                          msg.sender === 'user' ? 'text-green-100' : 'text-gray-500'
                        }`}>
                          {msg.senderName}
                        </p>
                      )}
                      <p className="text-sm">{msg.text}</p>
                      <p
                        className={`text-xs mt-1 ${
                          msg.sender === 'user' ? 'text-green-100' : 'text-gray-500'
                        }`}
                      >
                        {msg.timestamp}
                      </p>
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 px-4 py-3 rounded-2xl">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-100"></div>
                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-200"></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Chat Input */}
              <div className="p-6 border-t">
                <div className="flex space-x-4">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder={t('contact.type', language)}
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!message.trim()}
                    className="bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>{t('contact.send', language)}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;