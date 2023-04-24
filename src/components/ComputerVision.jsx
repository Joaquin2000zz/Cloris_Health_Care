import styles from "../style";


const ComputerVision = ({ img, description, source, link, index, n }) => (
    <div onClick={() => { if (link) window.open(link) }} className={`flex justify-between flex-col
    rounded-[20px] max-w-[570px] feedback-card ${link ? 'cursor-pointer' : ''}
      ${index !== n - 1 ? 'mb-2' : 'mb-0'} feature-card hover:bg-dimBlue w-full`}>
  
      <div className={`w-[100%] h-[500px] ${styles.flexCenter}
         flex flex-col space-y-7`}>
        <h3 className='font-poppins font-normal mt-1
          text-dimWhite text-[16px] '>{description}:</h3>
        <img src={img} alt="star" className='w-[80%] h-[50%] object-scale-down
        transition duration-100 ease-in-out hover:scale-150 onclick:scale-150 max-w-[670px]' />
        <p className='font-poppins font-normal
          text-dimWhite text-[9px]'>
          Source:<br />"{source}".
        </p>
      </div>
    </div>
  )

export default ComputerVision;
