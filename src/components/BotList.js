import React, { useState } from 'react'
import { Trash, PencilSquare, Save } from 'react-bootstrap-icons'
import Popup from './Popup'

const BotList = ({names, setNames, handleSortName}) => {

  const [editing, setEditing] = useState({
    allowEdit: true,
    id: null,
  });
  const [newName, setNewName] = useState({});
  const [popup, setPopup] = useState({
    show: false, // initial values set to false and null
    id: null,
  });

  const handleEdit = ({id}) => {
    setEditing({allowEdit: true, id: id});
    const editedName = names.find(name => name.id === id);
    setNewName({"newbotname": editedName.title, "newchipnum": editedName.chip});
  };

  const handleSave = (event) => {
    event.preventDefault();
    const edited = names.map(name =>
                      name.id === editing.id && editing.allowEdit
                        ? { ...name, id: name.id, title: newName.newbotname , chip: newName.newchipnum}
                        : name
                    )
    handleSortName(edited);
    setEditing({allowEdit: true, id: null});
  };

  // This will show the Cofirmation Box

  const handleDelete = ({id}) => {
    setPopup({
      show: true,
      id: id,
    });
    setEditing({allowEdit: false, id: null});
  };

  // This will perform the deletion and hide the Confirmation Box

  const handleDeleteTrue = () => {
    if (popup.show && popup.id) {
      let filteredNames = names.filter((name) => name.id !== popup.id);
      setNames(filteredNames);
      setPopup({
        show: false,
        id: null,
      });
    }
    setEditing({allowEdit: true, id: null});
  };

  // This will just hide the Confirmation Box when user clicks "No"/"Cancel"

  const handleDeleteFalse = () => {
    setPopup({
      show: false,
      id: null,
    });
    setEditing({allowEdit: true, id: null});
  };

  const handleChange = (event) => {
    setNewName(prevState => ({ ...prevState, [event.target.name]: event.target.value }))
  };

  return (
    <div>
        {names.map(name => (
          <li className='list-item container' key={name.id}>
            {editing.id === name.id && !popup.show ? (
              <form className='edit-form' onSubmit={handleSave} onChange={handleChange}>
                <input
                  type="text"
                  className='text-edit-input'
                  name="newbotname"
                  autocomplete="off"
                  value={newName.newbotname} 
                  required
                />
                <input
                  type="number"
                  className='num-edit-input'
                  name="newchipnum"
                  autocomplete="off"
                  value={newName.newchipnum} 
                  min="0"
                  required
                />
                <Save className="button-sv" onClick={handleSave}></Save>
              </form>
            ) : (
              <>
                {popup.id !== name.id && (
                <>{name.title} 
                  <div>
                    {name.chip} &nbsp;
                    <PencilSquare className='button-del-ed' onClick={() => handleEdit(name)}/>
                    <Trash className='button-del-ed' onClick={() => handleDelete(name)}/>
                  </div>
                </>
                )}
                {popup.id === name.id && popup.show && (
                  <>
                    {name.title} 
                    <Popup
                      handleDeleteTrue={handleDeleteTrue}
                      handleDeleteFalse={handleDeleteFalse}
                    />
                  </>
                )}
              </>
            )}
          </li>
        ))}
    </div>
  )
}


export default BotList
