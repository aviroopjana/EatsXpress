import backgroundBanner from '../../public/assets/background-banner.jpg'

const Homepage = () => {
  return (
    <div>
      <div className="w-full">
        <img src={backgroundBanner} alt="background" className="object-cover h-[750px] w-full"/>
      </div>
    </div>
  )
}

export default Homepage