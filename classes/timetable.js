const subjects = [
  { id: 1, name: "Math" },
  { id: 2, name: "Science" },
  { id: 3, name: "History" },
  { id: 4, name: "Geography" },
  { id: 5, name: "English" },
  { id: 6, name: "Art" },
  { id: 7, name: "Music" },
  { id: 8, name: "PE" },
];

const schedules = [
  // Math (Subject ID: 1)
  {
    id: 1,
    subject_id: 1,
    day: "Monday",
    start_time: "8:00 AM",
    duration: "1 hour",
    room: "Room 1",
  },
  {
    id: 2,
    subject_id: 1,
    day: "Wednesday",
    start_time: "8:00 AM",
    duration: "1 hour",
    room: "Room 1",
  },
  {
    id: 3,
    subject_id: 1,
    day: "Friday",
    start_time: "8:00 AM",
    duration: "1 hour",
    room: "Room 1",
  },

  // Science (Subject ID: 2)
  {
    id: 4,
    subject_id: 2,
    day: "Monday",
    start_time: "9:00 AM",
    duration: "1 hour",
    room: "Room 2",
  },
  {
    id: 5,
    subject_id: 2,
    day: "Wednesday",
    start_time: "9:00 AM",
    duration: "1 hour",
    room: "Room 2",
  },
  {
    id: 6,
    subject_id: 2,
    day: "Friday",
    start_time: "9:00 AM",
    duration: "1 hour",
    room: "Room 2",
  },

  // History (Subject ID: 3)
  {
    id: 7,
    subject_id: 3,
    day: "Monday",
    start_time: "10:00 AM",
    duration: "1 hour",
    room: "Room 3",
  },
  {
    id: 8,
    subject_id: 3,
    day: "Wednesday",
    start_time: "10:00 AM",
    duration: "1 hour",
    room: "Room 3",
  },
  {
    id: 9,
    subject_id: 3,
    day: "Friday",
    start_time: "10:00 AM",
    duration: "1 hour",
    room: "Room 3",
  },

  // Geography (Subject ID: 4)
  {
    id: 10,
    subject_id: 4,
    day: "Monday",
    start_time: "11:00 AM",
    duration: "1 hour",
    room: "Room 4",
  },
  {
    id: 11,
    subject_id: 4,
    day: "Wednesday",
    start_time: "11:00 AM",
    duration: "1 hour",
    room: "Room 4",
  },
  {
    id: 12,
    subject_id: 4,
    day: "Friday",
    start_time: "11:00 AM",
    duration: "1 hour",
    room: "Room 4",
  },

  // English (Subject ID: 5)
  {
    id: 13,
    subject_id: 5,
    day: "Tuesday",
    start_time: "8:00 AM",
    duration: "1 hour",
    room: "Room 5",
  },
  {
    id: 14,
    subject_id: 5,
    day: "Thursday",
    start_time: "8:00 AM",
    duration: "1 hour",
    room: "Room 5",
  },
  {
    id: 15,
    subject_id: 5,
    day: "Saturday",
    start_time: "8:00 AM",
    duration: "1 hour",
    room: "Room 5",
  },

  // Art (Subject ID: 6)
  {
    id: 16,
    subject_id: 6,
    day: "Tuesday",
    start_time: "9:00 AM",
    duration: "1 hour",
    room: "Room 6",
  },
  {
    id: 17,
    subject_id: 6,
    day: "Thursday",
    start_time: "9:00 AM",
    duration: "1 hour",
    room: "Room 6",
  },
  {
    id: 18,
    subject_id: 6,
    day: "Saturday",
    start_time: "9:00 AM",
    duration: "1 hour",
    room: "Room 6",
  },

  // Music (Subject ID: 7)
  {
    id: 19,
    subject_id: 7,
    day: "Tuesday",
    start_time: "10:00 AM",
    duration: "1 hour",
    room: "Room 7",
  },
  {
    id: 20,
    subject_id: 7,
    day: "Thursday",
    start_time: "10:00 AM",
    duration: "1 hour",
    room: "Room 7",
  },
  {
    id: 21,
    subject_id: 7,
    day: "Saturday",
    start_time: "10:00 AM",
    duration: "1 hour",
    room: "Room 7",
  },

  // PE (Subject ID: 8)
  {
    id: 22,
    subject_id: 8,
    day: "Tuesday",
    start_time: "11:00 AM",
    duration: "1 hour",
    room: "Room 8",
  },
  {
    id: 23,
    subject_id: 8,
    day: "Thursday",
    start_time: "11:00 AM",
    duration: "1 hour",
    room: "Room 8",
  },
  {
    id: 24,
    subject_id: 8,
    day: "Saturday",
    start_time: "11:00 AM",
    duration: "1 hour",
    room: "Room 8",
  },
];

export { subjects, schedules };
