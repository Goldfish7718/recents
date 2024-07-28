"use client"

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useAuth } from '@/context/AuthContext'
import CountUp from 'react-countup'

const Dashboard = () => {

  const { user } = useAuth()

  return (
    <main>
      <div className='flex gap-2'>
        <Card className='w-1/3 bg-yellow-100 text-neutral-700'>
          <CardHeader>
            <CardTitle>Limelight requests</CardTitle>
          </CardHeader>
          <CardContent>
            <h1>
              <CountUp end={user?.limelightRequests as number} duration={4} />
            </h1>
          </CardContent>
        </Card>
        <Card className='w-1/3 bg-red-100 text-neutral-700'>
          <CardHeader>
            <CardTitle>Daily requests</CardTitle>
          </CardHeader>
          <CardContent>
            <h1>
              <CountUp end={user?.dailySummariesRequests as number} duration={4} />
            </h1>
          </CardContent>
        </Card>
        <Card className='w-1/3 bg-blue-100 text-neutral-700'>
          <CardHeader>
            <CardTitle>Total API usage</CardTitle>
          </CardHeader>
          <CardContent>
            <h1>
              <CountUp end={user?.dailySummariesRequests as number + user?.limelightRequests! as number} duration={4} />
            </h1>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}

export default Dashboard