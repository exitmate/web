'use client'
import { useParams } from 'next/navigation'

const ApplyPage = () => {
  const { id } = useParams()
  return <div>ApplyPage {id}</div>
}

export default ApplyPage