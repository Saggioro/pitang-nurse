import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Table, Button } from 'react-bootstrap';
import { format, parseISO } from 'date-fns';
import { useHistory } from 'react-router-dom';
import api from '../services/api';

const ListView = () => {
  const [appointments, setAppointments] = useState([]);
  const history = useHistory();
  const fetchData = async () => {
    try {
      const response = await api.get('/appointments/today');
      setAppointments(response.data);
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          'Parece que algo deu errado em nossos servidores :(',
      );
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Table>
      <thead>
        <tr>
          <th>Data</th>
          <th>Hora</th>
          <th>Nome</th>
          <th>CPF</th>
          <th>#</th>
        </tr>
      </thead>
      <tbody>
        {appointments.map(appointment => {
          return appointment.users.map(appointmentUser => (
            <tr key={appointmentUser.id}>
              <td>{format(parseISO(appointment.date), 'dd/MM/yyyy')}</td>
              <td>{format(parseISO(appointment.date), 'HH:mm')}</td>
              <td>{appointmentUser.user.name}</td>
              <td>{appointmentUser.user.cpf}</td>
              <td>
                <Button
                  onClick={() => history.push(`/attend/${appointmentUser.id}`)}
                >
                  Atender
                </Button>
              </td>
            </tr>
          ));
        })}
      </tbody>
    </Table>
  );
};

export default ListView;
