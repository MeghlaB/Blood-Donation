import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function ContentManagement() {
  return (
    <div>
      <div>
        <Link to={'add-blog'}>
          <button>Add Blog </button>
        </Link>
      </div>
    </div>
  )
}
