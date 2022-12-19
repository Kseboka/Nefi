import { Bar } from 'react-chartjs-2'
import { Chart as ChartJS } from 'chart.js/auto'
import { parseISO, format, sub, subDays } from 'date-fns'
import { useState, useEffect } from 'react'
import supabase from '../../utils/supabase'
import { Paper } from '@mantine/core'

const AttendanceGraph = () => {
  const [attendanceData, setAttendanceData] = useState({
    labels: [],
    datasets: [],
  })

  useEffect(() => {
    const getAttendanceData = async () => {
      const todayDate = format(new Date(), 'yyyy-MM-dd')
      const last7days = format(subDays(parseISO(todayDate), 7), 'yyyy-MM-dd')
      console.log(last7days)

      try {
        // Get attendance data for the past 7 days
        const { data: attendance, error } = await supabase.from('attendance').select().gt('date', last7days)
        if (error) throw error
        // Format attendance data for the graph
        const labels = []
        const dataset = []

        if (attendance.length > 0) {
          attendance.map((day) => {
            labels.push(format(parseISO(day.date), 'EEEE'))
            dataset.push(day.attendants.length)
          })
        }

        // Set attendance data in state
        setAttendanceData({
          labels,
          datasets: [
            {
              label: 'Attendance',
              data: dataset,
              backgroundColor: ['#dd2727', '#31a34b'],
              colo: 'white',
              borderColor: 'black',
              borderWidth: 2,
            },
          ],
        })
      } catch (error) {
        console.log(error)
      }
    }

    getAttendanceData()
  }, [])

  return (
    <Paper withBorder className='bg-midnight p-4 text-white'>
      <Bar
        data={attendanceData}
        options={{
          scales: {
            x: {
              ticks: {
                color: 'white',
              },
            },
            y: {
              ticks: {
                color: 'white',
              },
            },
          },
        }}
      />
    </Paper>
  )
}

export default AttendanceGraph
