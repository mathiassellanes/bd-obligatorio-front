import { useEffect, useState } from "react";
import { getActivities } from "../api/activities";
import { getInstructors } from "../api/instructors";
import { getTurns } from "../api/turns";
import { getStudents } from "../api/students";
import { getEquipements } from "../api/equipements";

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
