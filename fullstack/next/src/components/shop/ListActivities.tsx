"use client";

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@/store'; // Importamos el tipo AppDispatch
import { 
  fetchActivities, 
  selectAllActivities, 
  selectActivitiesStatus, 
  selectActivitiesError 
} from '@/store/slices/activitiesSlice';
import SkeletonLoader from '@/utils/SkeletonLoader';

const ListActivities: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const activities = useSelector(selectAllActivities);
  const status = useSelector(selectActivitiesStatus);
  const error = useSelector(selectActivitiesError);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchActivities());
    }
  }, [status, dispatch]);

  if (status === 'loading') {
    return <SkeletonLoader type="card" count={3} />;
  }

  if (status === 'failed') {
    return (
      <div>
        <h2>Error al cargar las actividades</h2>
        <p>Detalles del error: {error || 'No se pudo conectar con el servidor.'}</p>
      </div>
    );
  }

  if (!activities || activities.length === 0) {
    return (
      <div>
        <h2>No hay actividades disponibles</h2>
        <p>Intenta recargar la página más tarde.</p>
      </div>
    );
  }

  return (
    <div>
      <h2>Activities</h2>
      <ul>
        {activities.map((activity) => (
          <li key={activity.id}>
            <h3>{activity.name_activitie}</h3>
            <p>{activity.description || 'Sin descripción'}</p>
            <p>Price: ${activity.price || 0}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListActivities;
