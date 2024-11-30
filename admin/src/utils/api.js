import axios from 'axios';

const API_BASE = 'https://cruise-ship-management.onrender.com'; 

export const fetchFitnessCenters = () => axios.get(`${API_BASE}/api/fitnessCenter/allFitnessCenter`);
export const createFitnessCenter = (data) => axios.post(`${API_BASE}/api/fitnessCenter/createFitnessCenter`, data);
export const updateFitnessCenter = (id, data) => axios.put(`${API_BASE}/api/fitnessCenter/${id}`, data);
export const deleteFitnessCenter = (id) => axios.delete(`${API_BASE}/api/fitnessCenter/${id}`);
export const fetchFitnessCenterById = (id) => axios.get(`${API_BASE}/api/fitnessCenter/${id}`);

// Equipment
export const fetchEquipment = (fitnessCenterId) => axios.get(`${API_BASE}/api/equipment/${fitnessCenterId}`);
export const createEquipment = (data) => axios.post(`${API_BASE}/api/equipment/createquipment`, data);
export const deleteEquipment = (id) => axios.delete(`${API_BASE}/api/equipment/${id}`);

// Time Slots
export const fetchTimeSlots = (fitnessCenterId) => axios.get(`${API_BASE}/api/timeslot/${fitnessCenterId}`);
export const createTimeSlot = (data) => axios.post(`${API_BASE}/api/timeslot/creatTimeSlot`, data);
export const deleteTimeSlot = (id) => axios.delete(`${API_BASE}/api/timeslot/${id}`);
