'use client';

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import { fetchActivity } from '@/store/slices/activitiesSlice';
import styles from '@/styles/inscriptions/InscriptionForm.module.css';
import { useRouter } from 'next/navigation';
import { FaUser, FaCalendar, FaDollarSign, FaDumbbell, FaComment } from 'react-icons/fa';
import PaymentInscriptionCard from './PaymentInscriptionCard';
import { getUserInfo } from '@/utils/auth';
import { getPatientsByUserId } from '@/services/inscriptions/user-patientService';

const InscriptionForm: React.FC<{ activityId: string }> = ({ activityId }) => {
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();
    const activity = useSelector((state: RootState) => state.activities.activities.find(a => a.id === parseInt(activityId)));
    const [selectedUser, setSelectedUser] = useState<string>('');
    const [specialRequest, setSpecialRequest] = useState<string>('');
    const [, setIsLoading] = useState(false);
    const [patients, setPatients] = useState<{ id: number, name_patient: string }[]>([]);
    const [userInfo, setUserInfo] = useState<{ id_user: number } | null>(null);

    useEffect(() => {
        if (!activity) {
            dispatch(fetchActivity(parseInt(activityId)));
        }
    }, [activityId, dispatch, activity]);

    useEffect(() => {
        const fetchUserInfo = async () => {
            const user = getUserInfo();
            console.log('User info:', user);
            if (user && user.id_user) {
                setUserInfo(user);
            } else {
                console.error('No user info available');
            }
        };

        fetchUserInfo();
    }, []);

    useEffect(() => {
        const fetchPatients = async () => {
            if (!userInfo || !userInfo.id_user) {
                console.error('No user info available');
                return;
            }

            try {
                console.log(`Fetching patients for user ID: ${userInfo.id_user}`);
                const patientsData = await getPatientsByUserId(userInfo.id_user);
                console.log('Patients fetched:', patientsData);

                if (Array.isArray(patientsData) && patientsData.length > 0) {
                    setPatients(patientsData);
                } else {
                    console.log('No patients found or invalid data format');
                }
            } catch (error) {
                console.error('Error fetching patients:', error);
            }
        };

        if (userInfo) {
            fetchPatients();
        }
    }, [userInfo]);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setIsLoading(true);
        try {
            // Simular proceso de inscripción
            await new Promise(resolve => setTimeout(resolve, 1000));
            router.push('/success');
        } catch (error) {
            console.error('Error en la inscripción:', error);
        } finally {
            setIsLoading(false);
        }
    };

    if (!activity) {
        return (
            <div className={styles.loadingContainer}>
                <div className={styles.spinner}></div>
                <p>Cargando detalles de la actividad...</p>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <h1 className={styles.title}>
                    <FaDumbbell className={styles.icon} />
                    Inscripción: {activity.name_activitie}
                </h1>
                
                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.formGrid}>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>
                                <FaDumbbell className={styles.inputIcon} />
                                Actividad
                            </label>
                            <input 
                                type="text" 
                                value={activity.name_activitie} 
                                readOnly 
                                className={styles.input} 
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>
                                <FaDollarSign className={styles.inputIcon} />
                                Precio
                            </label>
                            <input 
                                type="text" 
                                value={`${activity.price}`} 
                                readOnly 
                                className={styles.input} 
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>
                                <FaCalendar className={styles.inputIcon} />
                                Día
                            </label>
                            <input 
                                type="text" 
                                value={getDayOfWeek(activity.id_dayoftheweek)} 
                                readOnly 
                                className={styles.input} 
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>
                                <FaUser className={styles.inputIcon} />
                                Usuario
                            </label>
                            <select 
                                value={selectedUser} 
                                onChange={(e) => setSelectedUser(e.target.value)} 
                                className={styles.select}
                                required
                            >
                                <option value="">Seleccione un usuario</option>
                                {patients && patients.length > 0 ? (
                                    patients.map(patient => (
                                        <option key={patient.id} value={patient.id}>{patient.name_patient}</option>
                                    ))
                                ) : (
                                    <option value="" disabled>No hay usuarios disponibles</option>
                                )}
                            </select>
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>
                                <FaComment className={styles.inputIcon} />
                                Solicitud Especial
                            </label>
                            <textarea 
                                value={specialRequest} 
                                onChange={(e) => setSpecialRequest(e.target.value)} 
                                className={styles.textarea}
                                placeholder="Inserte las dificultades del paciente aquí"
                            />
                        </div>
                    </div>
                </form>
            </div>
            <PaymentInscriptionCard 
                amount={activity.price} 
                activityId={activity.id} 
                patientId={parseInt(selectedUser)} 
                specialRequest={specialRequest} 
            />
        </div>
    );
};

export default InscriptionForm;

const getDayOfWeek = (dayNumber: number) => {
    const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    return days[dayNumber % 7];
};