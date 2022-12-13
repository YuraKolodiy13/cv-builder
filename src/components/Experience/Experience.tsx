import React, {useState} from 'react';
import './Experience.scss';

interface IGeneral {
  name: string,
  profession: string,
  summary: string,
}

const Experience: React.FC = () => {

  const [general, setGeneral] = useState<IGeneral>({
    name: 'Your name',
    profession: 'Your profession',
    summary: 'Summary of Yourself'
  });

  const handleGeneral = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGeneral({...general, [e.target.name]: e.target.value})
  }

  return (
    <div className='experience'>
      <div className="experience__header">
        <h1>
          <input
            type="text"
            name='name'
            value={general.name}
            onChange={handleGeneral}
            placeholder='Your name'
          />
        </h1>
        <h6>
          <input
            type="text"
            name='profession'
            value={general.profession}
            onChange={handleGeneral}
            placeholder='Your profession'
          />
        </h6>
        <p>
          <input
            type="text"
            value={general.summary}
            onChange={handleGeneral}
            placeholder='Summary of Yourself'
          />
        </p>
      </div>
    </div>
  );
};

export default Experience;