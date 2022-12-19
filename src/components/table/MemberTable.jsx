import { useState } from 'react'
import { Table } from '@mantine/core'
import { Link, useNavigate } from 'react-router-dom'

const MemberTable = ({ members }) => {
  const navigate = useNavigate()
  return (
    <Table className='w-full h-full' highlightOnHover>
      <thead className='sticky top-0 py-6 bg-midnight'>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Membership</th>
          {/* <th></th> */}
        </tr>
      </thead>
      <tbody>
        {members.map((member) => {
          return (
            <tr key={member.id} onClick={() => navigate(`/gym/members/${member.id}`)}>
              <td>{member.name}</td>
              <td>{member.email}</td>
              <td>{member.membership_type}</td>
              {/* <td>{member.mass}</td> */}
            </tr>
          )
        })}
      </tbody>
    </Table>
  )
}

{
  /* <h2 className='sticky top-0 text-center bg-midnight'>MemberList</h2> */
}
export default MemberTable
