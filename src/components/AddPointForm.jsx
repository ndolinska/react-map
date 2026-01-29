import { useState, useEffect } from 'react';
import { convertToBase64 } from '../utils/imageConverter';
import { getAddressFromAPI } from '../api/geocodingAPI';
import { CATEGORIES } from '../utils/Consts';
import { useQuery } from '@tanstack/react-query';
import './AddPointForm.scss';

const AddPointForm = ({ coords, onSave, onCancel, initialData }) => {
  const { data: address, isLoading: isLoadingAddress } = useQuery({
    queryKey: ['geocode', coords?.lat?.toFixed(3), coords?.lng?.toFixed(3)],
    queryFn: () => getAddressFromAPI(coords.lat, coords.lng),
    enabled: !!coords && !initialData,
    staleTime: 1000 * 60 * 60,
  });

  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    desc: initialData?.desc || '',
    type: initialData?.type || 'miejsce',
    image: initialData?.image || null,
  });

  useEffect(() => {
    if (address && !initialData) {
      setFormData((prev) => ({
        ...prev,
        desc: address,
      }));
    }
  }, [address, initialData]);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const base64 = await convertToBase64(file);
      setFormData({ ...formData, image: base64 });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="add-point-overlay">
      <div className="add-point-card">
        
        <div className="form-header">
          <h3>{initialData ? 'Edytuj punkt' : 'Dodaj nowy punkt'}</h3>
          {!initialData && coords && (
            <small className="coords-badge">
              {coords.lat.toFixed(3)}, {coords.lng.toFixed(3)}
            </small>
          )}
        </div>

        {isLoadingAddress && <p className="loading-text">Pobieranie adresu...</p>}

        <form onSubmit={handleSubmit} className="form-content">
          <input
            id="name"
            autoComplete="off" 
            type="text"
            placeholder="Nazwa miejsca"
            required
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />

          <textarea
            id="textarea"
            autoComplete="off" 
            placeholder="Opis..."
            rows={3}
            value={formData.desc}
            onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
          />

          <select
            id="select"
            autoComplete="off" 
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
          >{CATEGORIES.map((c)=><option key={c.id} value={c.id}>{c.label}</option>)}
          </select>

          <div className="file-input-wrapper">
            <label className="file-label">
              {formData.image ? 'Zmień zdjęcie' : 'Wgraj zdjęcie'}
              <input type="file" accept="image/*" onChange={handleImageChange} />
            </label>
            {formData.image && (
              <img src={formData.image} alt="Podgląd" className="image-preview" />
            )}
          </div>

          <div className="form-actions">
            <button type="button" onClick={onCancel} className="btn cancel">
              Anuluj
            </button>
            <button type="submit" className="btn save">
              Zapisz
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPointForm;