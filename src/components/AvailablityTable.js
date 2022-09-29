import React from 'react';
import Table from 'react-bootstrap/Table';

export default function AvailabilityTable({ headers, hours, availability }) {

  const checkAvailable = (time, title) =>{
    let filtered = availability.filter(x=>x.title === title)
    let sameTimeFilter = filtered.filter(x=> x.startTime === time)
    
    if(sameTimeFilter.length > 0){
      let span = sameTimeFilter[0].endTime - sameTimeFilter[0].startTime
      return <td key={`col-${time}-${title}`} rowSpan={span} className='green'>available</td>
    }
    else if(filtered.filter(x=>x.startTime <= time && x.endTime > time).length > 0)
       return
    else
      return <td key={`col-${time}-${title}`}></td>
  }

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th></th>
          {
            headers.map(header =>
              <th key={header}>{header}</th>
            )
          }
        </tr>
      </thead>
      <tbody>
        {
          hours.map(hour => {
            return (
              <tr key={`row-${hour}`}>
                <td>{`${hour > 12 ? hour - 12 : hour}:00`}</td>
                {headers.map(title => checkAvailable(hour, title))}
              </tr>
            )
          })
        }
      </tbody>
    </Table>
  );
}