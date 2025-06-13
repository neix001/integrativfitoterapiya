import React, { useState } from 'react';
import { Plus, Edit, Trash2, Save, X } from 'lucide-react';
import { useData } from '../../contexts/DataContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { LiveClass } from '../../types';

const AdminClassManager: React.FC = () => {
  const { liveClasses, createLiveClass, updateLiveClass, deleteLiveClass } = useData();
  const { language } = useLanguage();
  const [isCreating, setIsCreating] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title_en: '',
    title_az: '',
    title_ru: '',
    description_en: '',
    description_az: '',
    description_ru: '',
    date: '',
    time: '',
    duration: 0,
    price: 0,
    maxParticipants: 0,
    instructor: ''
  });

  const resetForm = () => {
    setFormData({
      title_en: '',
      title_az: '',
      title_ru: '',
      description_en: '',
      description_az: '',
      description_ru: '',
      date: '',
      time: '',
      duration: 0,
      price: 0,
      maxParticipants: 0,
      instructor: ''
    });
  };

  const handleCreate = () => {
    setIsCreating(true);
    resetForm();
  };

  const handleEdit = (liveClass: LiveClass) => {
    setEditingId(liveClass.id);
    setFormData({
      title_en: liveClass.title.en,
      title_az: liveClass.title.az,
      title_ru: liveClass.title.ru,
      description_en: liveClass.description.en,
      description_az: liveClass.description.az,
      description_ru: liveClass.description.ru,
      date: liveClass.date,
      time: liveClass.time,
      duration: liveClass.duration,
      price: liveClass.price,
      maxParticipants: liveClass.maxParticipants,
      instructor: liveClass.instructor
    });
  };

  const handleSave = async () => {
    try {
      const classData = {
        title: {
          en: formData.title_en,
          az: formData.title_az,
          ru: formData.title_ru
        },
        description: {
          en: formData.description_en,
          az: formData.description_az,
          ru: formData.description_ru
        },
        date: formData.date,
        time: formData.time,
        duration: formData.duration,
        price: formData.price,
        maxParticipants: formData.maxParticipants,
        currentParticipants: 0,
        instructor: formData.instructor
      };

      if (isCreating) {
        await createLiveClass(classData);
        setIsCreating(false);
      } else if (editingId) {
        await updateLiveClass(editingId, classData);
        setEditingId(null);
      }
      resetForm();
    } catch (error) {
      console.error('Error saving live class:', error);
      alert('Error saving live class');
    }
  };

  const handleCancel = () => {
    setIsCreating(false);
    setEditingId(null);
    resetForm();
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this class?')) {
      try {
        await deleteLiveClass(id);
      } catch (error) {
        console.error('Error deleting live class:', error);
        alert('Error deleting live class');
      }
    }
  };

  const handleChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Live Classes</h2>
        <button
          onClick={handleCreate}
          className="bg-green-600 text-white px-4 py-2 rounded-xl hover:bg-green-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Class</span>
        </button>
      </div>

      {(isCreating || editingId) && (
        <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-green-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-900">
              {isCreating ? 'Create New Class' : 'Edit Class'}
            </h3>
            <div className="flex space-x-2">
              <button
                onClick={handleSave}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
              >
                <Save className="w-4 h-4" />
                <span>Save</span>
              </button>
              <button
                onClick={handleCancel}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors flex items-center space-x-2"
              >
                <X className="w-4 h-4" />
                <span>Cancel</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {/* English */}
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-700">English</h4>
              <input
                type="text"
                placeholder="Title (English)"
                value={formData.title_en}
                onChange={(e) => handleChange('title_en', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <textarea
                placeholder="Description (English)"
                value={formData.description_en}
                onChange={(e) => handleChange('description_en', e.target.value)}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            {/* Azerbaijani */}
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-700">Azərbaycan</h4>
              <input
                type="text"
                placeholder="Title (Azərbaycan)"
                value={formData.title_az}
                onChange={(e) => handleChange('title_az', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <textarea
                placeholder="Description (Azərbaycan)"
                value={formData.description_az}
                onChange={(e) => handleChange('description_az', e.target.value)}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            {/* Russian */}
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-700">Русский</h4>
              <input
                type="text"
                placeholder="Title (Русский)"
                value={formData.title_ru}
                onChange={(e) => handleChange('title_ru', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <textarea
                placeholder="Description (Русский)"
                value={formData.description_ru}
                onChange={(e) => handleChange('description_ru', e.target.value)}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <input
              type="date"
              placeholder="Date"
              value={formData.date}
              onChange={(e) => handleChange('date', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            <input
              type="time"
              placeholder="Time"
              value={formData.time}
              onChange={(e) => handleChange('time', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            <input
              type="number"
              placeholder="Duration (minutes)"
              value={formData.duration}
              onChange={(e) => handleChange('duration', parseInt(e.target.value) || 0)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            <input
              type="number"
              placeholder="Price ($)"
              value={formData.price}
              onChange={(e) => handleChange('price', parseFloat(e.target.value) || 0)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            <input
              type="number"
              placeholder="Max Participants"
              value={formData.maxParticipants}
              onChange={(e) => handleChange('maxParticipants', parseInt(e.target.value) || 0)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            <input
              type="text"
              placeholder="Instructor"
              value={formData.instructor}
              onChange={(e) => handleChange('instructor', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
        </div>
      )}

      <div className="space-y-4">
        {liveClasses.map((liveClass) => (
          <div key={liveClass.id} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {liveClass.title[language]}
                </h3>
                <p className="text-gray-600 mb-3">{liveClass.description[language]}</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-500">
                  <span><strong>Date:</strong> {liveClass.date}</span>
                  <span><strong>Time:</strong> {liveClass.time}</span>
                  <span><strong>Duration:</strong> {liveClass.duration} min</span>
                  <span><strong>Price:</strong> ${liveClass.price}</span>
                  <span><strong>Instructor:</strong> {liveClass.instructor}</span>
                  <span><strong>Participants:</strong> {liveClass.currentParticipants}/{liveClass.maxParticipants}</span>
                </div>
              </div>
              <div className="flex items-center space-x-2 ml-4">
                <button
                  onClick={() => handleEdit(liveClass)}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(liveClass.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminClassManager;