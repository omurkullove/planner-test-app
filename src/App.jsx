import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addElement,
  deleteElements,
  setChairs,
  setPartitions,
  setTables,
} from './ElemSlice';
import swal from 'sweetalert';

const App = () => {
  // Limits
  const TopLimit = 0;
  const RightLimit = 440;
  const BottomLimit = 410;
  const leftLimit = 0;

  // Elements
  const tables = useSelector((state) => state.elems.tables);
  const chairs = useSelector((state) => state.elems.chairs);
  const partitions = useSelector((state) => state.elems.partitions);

  const dispatch = useDispatch();

  const handleAdd = (type) => {
    const element = {
      offX: 0,
      offY: 0,
      x: 0,
      y: 0,
      id: Date.now(),
      type,
      isDragg: false,
    };

    dispatch(addElement(element));
  };

  // Table
  const handleTableDraggStart = (id, e) => {
    const updatedTables = tables.map((table) => {
      if (table.id === id) {
        return {
          ...table,
          offX: e.clientX - table.x,
          offY: e.clientY - table.y,
          isDragg: true,
        };
      }
      return table;
    });
    dispatch(setTables(updatedTables));
  };

  const handleTableDraggEnd = (id, e) => {
    const updatedTables = tables.map((table) => {
      if (table.id === id) {
        let x = e.clientX - table.offX;
        let y = e.clientY - table.offY;

        if (x < leftLimit) {
          x = leftLimit;
        } else if (x > RightLimit) {
          x = RightLimit;
        }

        if (y < TopLimit) {
          y = TopLimit;
        } else if (y > BottomLimit) {
          y = BottomLimit;
        }
        return {
          ...table,
          x: x,
          y: y,
          isDragg: false,
        };
      }
      return table;
    });
    dispatch(setTables(updatedTables));
  };

  // Chairs
  const handleChairDraggStart = (id, e) => {
    const updatedChairs = chairs.map((chair) => {
      if (chair.id === id) {
        return {
          ...chair,
          offX: e.clientX - chair.x,
          offY: e.clientY - chair.y,
          isDragg: true,
        };
      }
      return chair;
    });
    dispatch(setChairs(updatedChairs));
  };

  const handleChairDraggEnd = (id, e) => {
    const updatedChairs = chairs.map((chair) => {
      if (chair.id === id) {
        let x = e.clientX - chair.offX;
        let y = e.clientY - chair.offY;

        if (x < leftLimit) {
          x = leftLimit;
        } else if (x > RightLimit) {
          x = RightLimit + 35;
        }

        if (y < TopLimit) {
          y = TopLimit;
        } else if (y > BottomLimit) {
          y = BottomLimit + 65;
        }
        return {
          ...chair,
          x: x,
          y: y,
          isDragg: false,
        };
      }
      return chair;
    });
    dispatch(setChairs(updatedChairs));
  };

  // Partition
  const handlePartitionDraggStart = (id, e) => {
    const updatedPartitions = partitions.map((partition) => {
      if (partition.id === id) {
        return {
          ...partition,
          offX: e.clientX - partition.x,
          offY: e.clientY - partition.y,
          isDragg: true,
        };
      }
      return partition;
    });
    dispatch(setPartitions(updatedPartitions));
  };
  const handlePartitionDraggEnd = (id, e) => {
    const updatedPartitions = partitions.map((partition) => {
      if (partition.id === id) {
        let x = e.clientX - partition.offX;
        let y = e.clientY - partition.offY;

        if (x < leftLimit) {
          x = leftLimit;
        } else if (x > RightLimit) {
          x = RightLimit + 30;
        }

        if (y < TopLimit) {
          y = TopLimit;
        } else if (y > BottomLimit) {
          y = BottomLimit + 70;
        }
        return {
          ...partition,
          x: x,
          y: y,
          isDragg: false,
        };
      }
      return partition;
    });
    dispatch(setPartitions(updatedPartitions));
  };

  // Save
  const save = () => {
    const jsonData = JSON.stringify([{ tables }, { chairs }, { partitions }]);
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const downloadLink = document.createElement('a');
    downloadLink.href = url;
    downloadLink.download = 'Elemnts coordinates';
    document.body.appendChild(downloadLink);
    downloadLink.click();
  };

  const saveModal = () => {
    swal({
      title: 'Attention !',
      text: 'When saving, make sure that the saved file with coordinates will not be lost for further recovery, and the current coordinates will be deleted.',
      buttons: {
        cansel: {
          text: 'Cancel',
          visible: true,
          closeModal: true,
          value: 'cansel',
        },
        confirm: {
          text: 'Clear, save!',
          className: 'custom-confirm-button',
          visible: true,
          value: 'confirm',
        },
      },
    }).then((value) => {
      if (value === 'confirm') {
        swal({
          icon: 'success',
          text: 'Great, the file has been saved on your computer!',
        });
        save();
      } else {
        swal({
          title: 'The saving process has been canceled',
          text: 'the file is not saved, continue on :)',
        });
      }
    });
  };
  // Delete
  const clear = () => {
    swal({
      title: 'Deleting process...',
      text: 'Are you sure you want to delete all elements?',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal('All elements have been deleted', {
          icon: 'success',
        });
        dispatch(deleteElements());
      } else {
        swal('All elements have been saved successfully!');
      }
    });
  };

  return (
    <div className='main'>
      <div className='indicator'>
        <h4>
          Tables:<span>{tables.length}</span>
        </h4>
        <h4>
          Chairs:<span>{chairs.length}</span>
        </h4>
        <h4>
          Partitions:<span>{partitions.length}</span>
        </h4>
      </div>
      <div className='elem-type'>
        <button className='elem' onClick={() => handleAdd('table')}>
          Table
        </button>
        <button className='elem' onClick={() => handleAdd('chair')}>
          Chair
        </button>
        <button className='elem' onClick={() => handleAdd('partition')}>
          Partition
        </button>
      </div>
      <div className='desk'>
        {tables &&
          tables.map((table) => (
            <div
              className='table'
              draggable
              key={table.id}
              style={{
                top: table.y,
                left: table.x,
                backgroundColor: table.isDragg ? 'gray' : 'darkgoldenrod',
              }}
              onDragStart={(event) => handleTableDraggStart(table.id, event)}
              onDragEnd={(event) => handleTableDraggEnd(table.id, event)}
            ></div>
          ))}
        {chairs &&
          chairs.map((chair) => (
            <div
              className='chair'
              draggable
              key={chair.id}
              style={{
                top: chair.y,
                left: chair.x,
                backgroundColor: chair.isDragg ? 'gray' : 'darkmagenta',
              }}
              onDragStart={(event) => handleChairDraggStart(chair.id, event)}
              onDragEnd={(event) => handleChairDraggEnd(chair.id, event)}
            ></div>
          ))}
        {partitions &&
          partitions.map((partition) => (
            <div
              className='partition'
              draggable
              key={partition.id}
              style={{
                top: partition.y,
                left: partition.x,
                backgroundColor: partition.isDragg ? 'gray' : 'darkgreen',
              }}
              onDragStart={(event) =>
                handlePartitionDraggStart(partition.id, event)
              }
              onDragEnd={(event) =>
                handlePartitionDraggEnd(partition.id, event)
              }
            ></div>
          ))}
      </div>
      <div className='tools'>
        <button className='tool save' onClick={saveModal}>
          Save
        </button>
        <button className='tool delete' onClick={clear}>
          delete
        </button>
      </div>
    </div>
  );
};

export default App;
