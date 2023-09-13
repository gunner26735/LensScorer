import React, {useContext, useEffect} from 'react'
import Card from '../components/Card/Card'
import Loading from '../components/LoadingSpinner/Loading'
import Auth from '../context/Auth'

const Account = () => {

    const { loading, loadingAnime2 } = useContext(Auth)

    useEffect(() => {
        loadingAnime2()
    }, [])

  return (
    <div style={{width:"100vw"}}>
        {loading ? (
          <Loading />
        ) : (
          <Card />
        )}
    </div>
  )
}

export default Account
