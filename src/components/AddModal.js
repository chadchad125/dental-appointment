import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

export default function AddModal({titles, hours, availability, updateData}) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let formData = {
    endTime: hours[0] || "", 
    startTime: hours[0] || null, 
    title: titles[0] || null
  }

  const updateForm = (e) =>{
    const target = e.target
    formData[target.id] = target.value
  }

  const submit = () => {    
    const filtered = availability.filter(x=>x.title === formData.title)
    const end = parseInt(formData.endTime)
    const start = parseInt(formData.startTime)

    if(end === start){
      alert("Start Time and End Time cannot be the same, please correct!")
      return
    }
    if(start > end){
      alert("Start Time cannot be after End Time, please correct!")
      return
    }    
    if(filtered.filter(x=>x.startTime <= start && x.endTime > start).length > 0){
      alert("Start Time overlaps with existing available time, please correct!")
      return
    }
    if(filtered.filter(x=>x.startTime <= end && x.endTime > end).length > 0){
      alert("End Time overlaps with existing available time, please correct!")
      return
    }
    
    formData.endTime = end
    formData.startTime = start
    updateData(formData);
    handleClose();
  }

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Add Availability
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Availability</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="title">
              <Form.Label>Select Column</Form.Label>
              <Form.Select aria-label="Titles" onChange={updateForm}>
                {titles.map(title => <option key={title} value={title}>{title}</option>)}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="startTime">
              <Form.Label>Start Time</Form.Label>
              <Form.Select aria-label="start Time" onChange={updateForm}>
                {hours.map(hour => <option key={`startHour-${hour}`} value={hour}>{hour > 12 ? hour-12 : hour}:00</option>)}
              </Form.Select>
            </Form.Group>
            
            <Form.Group className="mb-3" controlId="endTime">
              <Form.Label>End Time</Form.Label>
              <Form.Select aria-label="end Time" onChange={updateForm}>
                {hours.map(hour => <option key={`endHour-${hour}`} value={hour}>{hour > 12 ? hour-12 : hour}:00</option>)}
                <option key={`endHour-${hours[hours.length-1]+1}`} value={hours[hours.length-1]+1}>{hours[hours.length-1]+1 > 12 ? hours[hours.length-1]+1-12 : hours[hours.length-1]+1}:00</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={submit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}