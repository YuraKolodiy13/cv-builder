import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  info: [
    {
      id: 1,
      type: 1,
      title: 'Personal Info',
      items: [
        {
          id: 1,
          title: 'Info 1',
          details: 'Details 1'
        },
        {
          id: 2,
          title: 'Info 2',
          details: 'Details 2'
        }
      ]
    },
    {
      id: 2,
      type: 2,
      title: 'Skills',
      items: [
        {
          id: 1,
          title: 'Skill 1',
          details: 4
        },
        {
          id: 2,
          title: 'Skill 2',
          details: 3
        },
      ]
    }
  ],
  experience: [
    {
      id: 1,
      title: 'Work Experience',
      items: [
        {
          id: 1,
          position: 'Your Designation (E.g. Software Engineer)',
          company: 'Company Name',
          description: 'Express your skills and experience you\'ve acquired from this job.',
          year: 'Year'
        }
      ]
    },
    {
      id: 2,
      title: 'Education',
      items: [
        {
          id: 1,
          position: 'Field of Study (E.g. Bachelor of IT)',
          company: 'School or Institution',
          description: 'Description',
          year: 'Year'
        }
      ]
    }
  ]
};

export const cvSlice = createSlice({
  name: 'cv',
  initialState,
  reducers: {
    changeInfo(state, action){
      state.info = action.payload;
    },
    changeExperience(state, action){
      state.experience = action.payload;
    }
  }
})

export const cvActions = cvSlice.actions;
export const cvReducer = cvSlice.reducer;