import { useEffect, useState } from "react";
import { getActivities, getActivityById } from "../api/activities";
import { getInstructorByCi, getInstructors } from "../api/instructors";
import { getTurns, getTurnsById } from "../api/turns";
import { getStudentById, getStudents, getStudentsByActivityAvailable } from "../api/students";
import { getEquipements, getEquipementsByActiviyId } from "../api/equipements";
import { getOverview } from "../api/overview";
import { instructor, instructors } from "../constants/types/instructors";
import { Student } from "../constants/types/students";

export const useActivities = () => {
  const [activities, setActivities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleGetActivities = async () => {
    setIsLoading(true);
    const activitiesResponse = await getActivities();

    setIsLoading(false);
    setActivities(activitiesResponse);
  }

  useEffect(() => {
    handleGetActivities();
  }, []);

  return {
    activities,
    isLoading,
  };
}

export const useTurns = () => {
  const [turns, setTurns] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleGetTurns = async () => {
    setIsLoading(true);
    const turnsResponse = await getTurns();

    setIsLoading(false);
    setTurns(turnsResponse);
  }

  useEffect(() => {
    handleGetTurns();
  }, []);

  return {
    turns,
    isLoading,
  };
}

export const useInstructors = () => {
  const [instructors, setInstructors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleGetInstructors = async () => {
    setIsLoading(true);
    const instructorsResponse = await getInstructors();

    setIsLoading(false);
    setInstructors(instructorsResponse);
  }

  useEffect(() => {
    handleGetInstructors();
  }, []);

  return {
    instructors,
    isLoading,
  };
}

export const useStudents = () => {
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleGetStudents = async () => {
    setIsLoading(true);
    const studentsResponse = await getStudents();

    setIsLoading(false);
    setStudents(studentsResponse);
  }

  useEffect(() => {
    handleGetStudents();
  }, []);

  return {
    students,
    isLoading,
  };
}

export const useEquipements = () => {
  const [equipements, setEquipements] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleGetEquipements = async () => {
    setIsLoading(true);
    const equipementsResponse = await getEquipements();

    setIsLoading(false);
    setEquipements(equipementsResponse);
  }

  useEffect(() => {
    handleGetEquipements();
  }, []);

  return {
    equipements,
    isLoading,
  };
}

export const useEquipementsByActivityId = ({ id }: { id: number }) => {
  const [equipements, setEquipements] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleGetEquipementsByActivityId = async (activityId: number) => {
    setIsLoading(true);
    const equipementsResponse = await getEquipementsByActiviyId({ id: activityId });

    setIsLoading(false);
    setEquipements(equipementsResponse);
  }

  useEffect(() => {
    handleGetEquipementsByActivityId(id);
  }, []);

  return {
    equipements,
    refetch: (id: number) => handleGetEquipementsByActivityId(id),
    isLoading,
  };
}

export const useStudentByCi = ({ ci }: { ci: string }) => {
  const [student, setStudent] = useState<Student>({
    ci: '',
    nombreCompleto: '',
    telefono: '',
    correo: '',
    nombre: '',
    apellido: '',
    fechaNacimiento: '',
    clases: [],
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleGetStudentById = async (studentCi: string) => {
    setIsLoading(true);
    const studentResponse = await getStudentById({ ci: studentCi });

    setIsLoading(false);
    setStudent(studentResponse || {
      ci: '',
      nombreCompleto: '',
      telefono: '',
      correo: '',
    });
  }

  useEffect(() => {
    handleGetStudentById(ci);
  }, []);

  return {
    student,
    setStudent,
    isLoading,
  };
}

export const useStudentsByActivityAvailable = (id: string) => {
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleGetStudents = async (activityId: string) => {
    setIsLoading(true);
    const studentsResponse = await getStudentsByActivityAvailable(activityId);

    setIsLoading(false);
    setStudents(studentsResponse);
  }

  useEffect(() => {
    if (id) {
      handleGetStudents(id);
    }
  }, []);

  return {
    refetch: (id: string) => handleGetStudents(id),
    students,
    isLoading,
  };
}

export const useInstructorByCi = ({ ci }: { ci: string }) => {
  const [instructor, setInstructor] = useState<instructor>({
    ci: '',
    nombreCompleto: '',
    nombre: '',
    apellido: '',
    clases: [],
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleGetInstructorByCi = async (instructorCi: string) => {
    setIsLoading(true);
    const instructorResponse = await getInstructorByCi({ ci: instructorCi });

    setIsLoading(false);
    setInstructor(instructorResponse || {
      ci: '',
      nombreCompleto: '',
      nombre: '',
      apellido: '',
      clases: [],
    });
  }

  useEffect(() => {
    handleGetInstructorByCi(ci);
  }, []);

  return {
    instructor,
    isLoading,
    setInstructor,
  };
}

export const useActivityById = ({ id }: { id: number }) => {
  const [activity, setActivity] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleGetActivityById = async (activityId: number) => {
    setIsLoading(true);
    const activityResponse = await getActivityById({ id: activityId });

    setIsLoading(false);
    setActivity(activityResponse || {
      id: 0,
      descripcion: '',
      costo: 0,
    });
  }

  useEffect(() => {
    handleGetActivityById(id);
  }, []);

  return {
    activity,
    isLoading,
    setActivity,
  };
}

export const useTurnById = ({ id }: { id: number }) => {
  const [turn, setTurn] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleGetTurnById = async (turnId: number) => {
    setIsLoading(true);
    const turnResponse = await getTurnsById({ id: turnId });

    setIsLoading(false);
    setTurn(turnResponse || {
      id: 0,
      horaInicio: '',
      horaFin: '',
    });
  }

  useEffect(() => {
    handleGetTurnById(id);
  }, []);

  return {
    turn,
    isLoading,
    setTurn,
  };
}

export const useOverview = () => {
  const [overview, setOverview] = useState({
    turns: [],
    activities: [],
    students: []
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleGetOverview = async () => {
    setIsLoading(true);
    const overviewResponse = await getOverview();

    setIsLoading(false);
    setOverview(overviewResponse);
  }

  useEffect(() => {
    handleGetOverview();
  }, []);

  return {
    overview,
    isLoading,
  };
}
