import React, { useState } from 'react';
import { Plus, Edit, Trash2, Save, X } from 'lucide-react';
import { useData } from '../../contexts/DataContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { DietProgram } from '../../types';

const AdminProgramManager: React.FC = () => {
  const { dietPrograms, createDietProgram, updateDietProgram, deleteDietProgram } = useData();
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
    price: 0,
    image: '',
    duration: '',
    features_en: '',
    features_az: '',
    features_ru: ''
  });

  const resetForm = () => {
    setFormData({
      title_en: '',
      title_az: '',
      title_ru: '',
      description_en: '',
      description_az: '',
      description_ru: '',
      price: 0,
      image: '',
      duration: '',
      features_en: '',
      features_az: '',
      features_ru: ''
    });
  };

  const handleCreate = () => {
    setIsCreating(true);
    resetForm();
  };

  const handleEdit = (program: DietProgram) => {
    setEditingId(program.id);
    setFormData({
      title_en: program.title.en,
      title_az: program.title.az,
      title_ru: program.title.ru,
      description_en: program.description.en,
      description_az: program.description.az,
      description_ru: program.description.ru,
      price: program.price,
      image: program.image,
      duration: program.duration,
      features_en: program.features.en.join('\n'),
      features_az: program.features.az.join('\n'),
      features_ru: program.features.ru.join('\n')
    });
  };

  const handleSave = async () => {
    try {
      const programData = {
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
        price: formData.price,
        image: formData.image,
        duration: formData.duration,
        features: {
          en: formData.features_en.split('\n').filter(f => f.trim()),
          az: formData.features_az.split('\n').filter(f => f.trim()),
          ru: formData.features_ru.split('\n').filter(f => f.trim())
        }
      };

      if (isCreating) {
        await createDietProgram(programData);
        setIsCreating(false);
      } else if (editingId) {
        await updateDietProgram(editingId, programData);
        setEditingId(null);
      }
      resetForm();
    } catch (error) {
      console.error('Error saving diet program:', error);
      alert('Error saving diet program');
    }
  };

  const handleCancel = () => {
    setIsCreating(false);
    setEditingId(null);
    resetForm();
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this program?')) {
      try {
        await deleteDietProgram(id);
      } catch (error) {
        console.error('Error deleting diet program:', error);
        alert('Error deleting diet program');
      }
    }
  };

  const handleChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Diet Programs</h2>
        <button
          onClick={handleCreate}
          className="bg-green-600 text-white px-4 py-2 rounded-xl hover:bg-green-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Program</span>
        </button>
      </div>

      {(isCreating || editingId) && (
        <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-green-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-900">
              {isCreating ? 'Create New Program' : 'Edit Program'}
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
              <textarea
                placeholder="Features (English) - One per line"
                value={formData.features_en}
                onChange={(e) => handleChange('features_en', e.target.value)}
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
              <textarea
                placeholder="Features (Azərbaycan) - One per line"
                value={formData.features_az}
                onChange={(e) => handleChange('features_az', e.target.value)}
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
              <textarea
                placeholder="Features (Русский) - One per line"
                value={formData.features_ru}
                onChange={(e) => handleChange('features_ru', e.target.value)}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="number"
              placeholder="Price ($)"
              value={formData.price}
              onChange={(e) => handleChange('price', parseFloat(e.target.value) || 0)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            <input
              type="text"
              placeholder="Duration (e.g., 12 weeks)"
              value={formData.duration}
              onChange={(e) => handleChange('duration', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            <input
              type="url"
              placeholder="Image URL"
              value={formData.image}
              onChange={(e) => handleChange('image', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dietPrograms.map((program) => (
          <div key={program.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
            <img
              src={program.image}
              alt={program.title[language]}
              className="w-full h-32 object-cover"
            />
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 mb-2">{program.title[language]}</h3>
              <p className="text-gray-600 text-sm mb-4">{program.description[language].substring(0, 100)}...</p>
              <div className="flex items-center justify-between">
                <span className="font-bold text-green-600">${program.price}</span>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleEdit(program)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(program.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminProgramManager;