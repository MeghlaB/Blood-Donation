import React, { useContext } from 'react'
import { AuthContext } from '../../Context/AuthProvider'

export default function UseAuth() {
    const auth = useContext(AuthContext)
  return auth
}
