import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppHeader } from '../components/AppHeader';
import { useAuth } from '../context/AuthContext';
import { api } from '../api/api';

const gradBorder: React.CSSProperties = {
  position: 'absolute', inset: 0, borderRadius: '32px', padding: '1px',
  background: 'linear-gradient(135deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0) 25%, rgba(255,255,255,0) 75%, rgba(255,255,255,0.5) 100%)',
  WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
  WebkitMaskComposite: 'xor', maskComposite: 'exclude', pointerEvents: 'none',
};

const inputStyle: React.CSSProperties = {
  width: '100%', height: '42px', backgroundColor: 'rgba(255,255,255,0.1)', border: 'none',
  borderRadius: '32px', padding: '0 20px', fontSize: '18px', fontFamily: 'Naga',
  color: '#fff', outline: 'none', position: 'relative', zIndex: 1, boxSizing: 'border-box',
};

const labelStyle: React.CSSProperties = {
  fontSize: '20px', color: '#fff', fontFamily: 'Naga', marginBottom: '6px', display: 'block',
};

export function EditProfile() {
  useEffect(() => { document.body.classList.remove('main-page'); }, []);

  const navigate = useNavigate();
  const { user, refreshProfile } = useAuth();

  const [firstName, setFirstName] = useState(user?.first_name ?? '');
  const [lastName, setLastName] = useState(user?.last_name ?? '');
  const [education, setEducation] = useState(user?.profile.education ?? '');
  const [city, setCity] = useState(user?.profile.city ?? '');
  const [bio, setBio] = useState(user?.profile.bio ?? '');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) {
      setFirstName(user.first_name);
      setLastName(user.last_name);
      setEducation(user.profile.education);
      setCity(user.profile.city);
      setBio(user.profile.bio);
    }
  }, [user?.id]);

  const handleSave = async () => {
    setSaving(true);
    setError('');
    try {
      await api.updateProfile({ first_name: firstName, last_name: lastName, education, city, bio });
      await refreshProfile();
      navigate('/profile');
    } catch {
      setError('Не удалось сохранить изменения. Проверьте подключение к серверу.');
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => navigate('/profile');

  return (
    <div className="min-vh-100 d-flex flex-column">
      <AppHeader />

      <div className="mx-auto" style={{ maxWidth: '1280px', width: 'calc(100% - 80px)', margin: '48px auto 0' }}>
        <div style={{ fontSize: '16px', color: 'rgba(255,255,255,0.6)', fontFamily: 'Naga' }}>
          Главная / Профиль / Редактирование
        </div>
      </div>

      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '48px 0 64px' }}>
        <div style={{
          width: '512px', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '32px',
          backdropFilter: 'blur(16px)', boxShadow: '10px 10px 16px 0px rgba(0,0,0,0.25)',
          padding: '40px', position: 'relative', display: 'flex', flexDirection: 'column', gap: '24px',
        }}>
          <div style={gradBorder} />

          <h2 style={{ fontSize: '28px', color: '#fff', textTransform: 'uppercase', margin: 0, fontFamily: 'Lemon Milk', textAlign: 'center' }}>
            Редактировать профиль
          </h2>

          {/* First name */}
          <div>
            <label style={labelStyle}>Имя</label>
            <div style={{ position: 'relative' }}>
              <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} style={inputStyle} />
              <div style={gradBorder} />
            </div>
          </div>

          {/* Last name */}
          <div>
            <label style={labelStyle}>Фамилия</label>
            <div style={{ position: 'relative' }}>
              <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} style={inputStyle} />
              <div style={gradBorder} />
            </div>
          </div>

          {/* Education */}
          <div>
            <label style={labelStyle}>Образование</label>
            <div style={{ position: 'relative' }}>
              <input type="text" value={education} onChange={(e) => setEducation(e.target.value)} style={inputStyle} placeholder="Учебное заведение" />
              <div style={gradBorder} />
            </div>
          </div>

          {/* City */}
          <div>
            <label style={labelStyle}>Город</label>
            <div style={{ position: 'relative' }}>
              <input type="text" value={city} onChange={(e) => setCity(e.target.value)} style={inputStyle} placeholder="Город" />
              <div style={gradBorder} />
            </div>
          </div>

          {/* Bio */}
          <div>
            <label style={labelStyle}>О себе</label>
            <div style={{ position: 'relative' }}>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Расскажите о себе..."
                style={{
                  ...inputStyle, height: 'auto', minHeight: '100px', padding: '12px 20px',
                  resize: 'vertical', lineHeight: '1.5',
                }}
              />
              <div style={{ ...gradBorder, borderRadius: '32px' }} />
            </div>
          </div>

          {error && (
            <div style={{ color: '#f44336', fontSize: '14px', fontFamily: 'Naga', textAlign: 'center' }}>{error}</div>
          )}

          {/* Actions */}
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
            <button onClick={handleSave} disabled={saving} style={{
              padding: '14px 32px', backgroundColor: 'rgba(255,255,255,0.1)', border: 'none',
              position: 'relative', cursor: saving ? 'not-allowed' : 'pointer', fontSize: '18px',
              fontFamily: 'Naga', color: '#fff', borderRadius: '32px', outline: 'none',
              opacity: saving ? 0.6 : 1,
            }}>
              <div style={gradBorder} />
              <span>{saving ? 'Сохранение...' : 'Сохранить'}</span>
            </button>
            <button onClick={handleCancel} disabled={saving} style={{
              padding: '14px 32px', backgroundColor: 'rgba(255,255,255,0.1)', border: 'none',
              position: 'relative', cursor: 'pointer', fontSize: '18px',
              fontFamily: 'Naga', color: '#fff', borderRadius: '32px', outline: 'none',
            }}>
              <div style={gradBorder} />
              <span>Отмена</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
