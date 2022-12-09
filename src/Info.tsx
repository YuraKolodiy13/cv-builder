import React, {useState} from 'react';
import './Info.scss';
import defaultImg from './assets/no-avatar.jpg';
import {ReactComponent as DeleteIcon} from './assets/delete.svg';

interface IAvatar {
  file: object | FileList;
  previewFile: string | ArrayBuffer;
}

interface IItem {
  id: number,
  title: string;
  details: string | number;
}

interface IElement {
  id: number,
  type: number;
  title: string;
  items: IItem[]
}


const initialItem = {
  title: 'Info',
  details: 'Details'
}

const Info: React.FC = () => {

  const [avatar, setAvatar] = useState<IAvatar>({
    file: {},
    previewFile: defaultImg,
  })

  const [state, setState] = useState<IElement[]>([
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
  ]);

  const handleFileChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target;
    if (input.files && input.files[0]) {
      setAvatar({...avatar, file: input.files[0]})
      const reader = new FileReader();
      reader.onload = (e) => {
        if(e.target && e.target.result){
          setAvatar({...avatar, previewFile: e.target.result});
        }
      };
      reader.readAsDataURL(input.files[0]);
    }else {
      setAvatar({...avatar, file: {}});
    }
  };

  const handleElementsState = (e:React.ChangeEvent<HTMLInputElement>, i: number) => {
    const neItems = state[i];
    neItems.title = e.target.value;
    const newState = [...state.slice(0, i), neItems, ...state.slice(i + 1)]
    setState(newState)
  }

  const handleItemsState = (e:React.ChangeEvent<HTMLInputElement>, i: number, j: number, name: keyof IItem) => {
    const neItems = state[i];
    neItems.items[j][name] = e.target.value;
    const newState = [...state.slice(0, i), neItems, ...state.slice(i + 1)]
    setState(newState)
  }

  const addItems = (i: number) => {
    const neItems = state[i];
    neItems.items = [...neItems.items, {id: neItems.items.length + 1, ...initialItem}]
    const newState = [...state.slice(0, i), neItems, ...state.slice(i + 1)]
    setState(newState)
  }

  console.log(state, 'state')

  return (
    <div className="info">
      <div className="info__avatar" style={{backgroundImage: `url(${avatar.previewFile})`}}>
        <label>
          <input
            type="file"
            name='file'
            accept="image/*"
            onChange={handleFileChange}
          />
        </label>
      </div>
      <div className='info__elements'>
        {state.map((item, i) =>
          <div key={item.id} className='info__element'>
            <h2>
              <input
                type="text"
                value={item.title}
                onChange={(e) => handleElementsState(e, i)}
                placeholder='Enter value'
              />
            </h2>
            {item.items.map((el: IItem, j) =>
              <div key={el.id} className='info__item'>
                <h3>
                  <input
                    type="text"
                    value={el.title}
                    onChange={(e) => handleItemsState(e, i, j, 'title')}
                    placeholder='Enter value'
                  />
                </h3>
                <p>
                  <input
                    type="text"
                    value={el.details}
                    onChange={(e) => handleItemsState(e, i, j, 'details')}
                    placeholder='Enter value'
                  />
                </p>
                <div className="remove"><DeleteIcon/></div>
              </div>
            )}
            <div className="addMore" onClick={() => addItems(i)}>
              <span>Add more {item.title} +</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Info;