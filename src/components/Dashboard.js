import Mensaje from './Mensaje';

const Dashboard = ({ usuario, onLogout, mensaje }) => {
  return (
    <div className="dashboard-container">
      <div className="dashboard-content">
        <h1>¡Bienvenido, {usuario?.username}!</h1>
        
        <Mensaje texto={mensaje.texto} tipo={mensaje.tipo} />
        
        <div className="user-info">
          <h3>Información del Usuario:</h3>
          <p><strong>ID:</strong> {usuario?.id}</p>
          <p><strong>Usuario:</strong> {usuario?.username}</p>
          <p><strong>Email:</strong> {usuario?.email}</p>
          <p><strong>Sesión iniciada:</strong> {new Date().toLocaleString()}</p>
        </div>

        <button onClick={onLogout} className="logout-btn">
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
};

export default Dashboard;