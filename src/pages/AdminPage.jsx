import { useState, use } from 'react'
import { DataContext } from '../context/DataContext';
import { AuthContext } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import AddPointForm from '../components/AddPointForm';
import './Pages.scss';


const AdminPage = () => {
  const { points, updatePoint, deletePoint } = use(DataContext);
  const { user } = use(AuthContext);

  const [editingPoint, setEditingPoint] = useState(null);

  if (!user) {
    return <Navigate to="/" replace />;
  }

  if (user.name !== 'admin') {
    return (
      <div className="access-denied">
        <h2>Brak dostępu!</h2>
        <p>Tylko użytkownik o nazwie "admin" ma tu wstęp.</p>
      </div>
    );
  }
  const handleUpdateSave = (updatedFormData) => {
    if (editingPoint) {
      updatePoint(editingPoint.id, updatedFormData);
      setEditingPoint(null);
      alert("Zaktualizowano pomyślnie!");
    }
  }

  return (
    <div className="admin-container">
      <h1>Panel Moderacji</h1>
      {points.length === 0 ? (
        <p>Brak punktów w bazie.</p>
      ) : (
        <table className="points-table">
          <thead>
            <tr>
              <th>Zdjęcie</th>
              <th>Nazwa</th>
              <th>Koordynaty</th>
              <th>Autor</th>
              <th>Typ</th>
              <th>Akcja</th>
            </tr>
          </thead>
          <tbody>
            {points.map((point) => (
              <tr key={point.id}>
                <td>
                  {point.image ? (
                    <img 
                      src={point.image} 
                      alt="mini" 
                      className="point-thumbnail" 
                    />) : 'brak'}
                </td>
                <td><strong>{point.title}</strong></td>
                <td><small>{point.lat.toFixed(3)}, {point.lng.toFixed(3)}</small></td>
                <td>{point.author}</td>
                <td>{point.type}</td>
                <td><button 
                  onClick={() => setEditingPoint(point)}
                  className='btn-delete'>
                  Edytuj
                </button></td>
                <td>
                <button 
                  onClick={() => deletePoint(point.id)}
                  className="btn-delete">
                    Usuń
                </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {editingPoint && (
        <AddPointForm 
          initialData={editingPoint} 
          onSave={handleUpdateSave}
          onCancel={() => setEditingPoint(null)}
        />
      )}
    </div>
  );
};

export default AdminPage;