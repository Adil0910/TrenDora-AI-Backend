import Resume from "../models/Resume.js";

export const createResume = async (data) => {
  return Resume.create(data);
};

export const findResumesByUser = async (userId) => {
  return Resume.find({ user: userId }).sort({ createdAt: -1 });
};

export const findResumeById = async (id) => {
  return Resume.findById(id);
};

export const deleteResumeById = async (id) => {
  return Resume.findByIdAndDelete(id);
};
