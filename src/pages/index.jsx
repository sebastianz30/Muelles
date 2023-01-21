import Head from 'next/head'
import Image from 'next/image'
// Components
import ListOfDocks from 'src/components/ListOfDocks'
import Nav from 'src/components/Nav'

export default function Home() {
  return (
    <div className={'app-container'}>
      <Nav />
      <ListOfDocks />
    </div>
  )
}
