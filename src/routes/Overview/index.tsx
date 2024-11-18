import { useOverview } from '../../utils/fetch.ts';
import PieChart from '../../components/PieChart';
import './styles.scss';

const Overview = () => {
  const { overview } = useOverview();



  const turnsData = {
    labels: overview.turns.map(turn => turn.horario),
    datasets: [
      {
        data: overview.turns.map(turn => turn.total_clases_dictadas),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'],
      },
    ],
  };

  const activitiesData = {
    labels: overview.activities.map(activity => activity.actividad),
    datasets: [
      {
        data: overview.activities.map(activity => parseFloat(activity.ingresos_totales)),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      },
    ],
  };

  const studentsData = {
    labels: overview.students.map(student => student.actividad),
    datasets: [
      {
        data: overview.students.map(student => student.total_alumnos),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      },
    ],
  };

  return (
    <div className="overview">
      <span className="overview__breadcrumb">Vista general</span>
      <div className="overview__charts">
        <PieChart title="Clases Dictadas por Turno" data={turnsData} />
        <PieChart title="Ingresos por Actividad" data={activitiesData} />
        <PieChart title="Alumnos por Actividad" data={studentsData} />
      </div>
    </div>
  );
};

export default Overview;
