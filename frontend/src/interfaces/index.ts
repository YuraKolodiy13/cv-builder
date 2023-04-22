export interface IHeadCell {
  field: string;
  headerName: string;
  withOutSort?: boolean;
}

export interface IInfoItem {
  id: number;
  title: string;
  details: string | number;
}

export interface IInfo {
  id: number;
  fieldType: 'text' | 'rating';
  title: string;
  items: IInfoItem[];
}

export interface IGeneral {
  name: string;
  profession: string;
  summary: string;
}
export interface IExperienceItem {
  id: number;
  position: string;
  company: string;
  description: string;
  year: string;
}
export interface IExperience {
  id: number;
  title: string;
  items: IExperienceItem[];
}

export interface ICvBuilderState {
  cvName: string;
  info: IInfo[];
  experience: IExperience[];
  general: IGeneral;
  avatar: string | ArrayBuffer;
}

export interface ICvBuilder extends ICvBuilderState {
  _id: number;
  createdAt: string;
  updatedAt: string;
}

export interface IAuthProps {
  open: boolean;
  setIsModalOpen: (b: boolean) => void;
}

export interface ISetState {
  setState: (p: { general: IGeneral; avatar: string | ArrayBuffer; experience: IExperience[]; info: IInfo[] }) => void
}
export interface SearchFunc {
  (source: string, subString: string): boolean;
}