import ReactLoading from 'react-loading';

const Loading = () => {
    return (
        <div className='w-full h-screen flex justify-center items-center bg-transparent flex-col'>
            <ReactLoading type={'spinningBubbles'} color={"#ffffff"} height={150} width={70} />
            <p className='-mt-12 font-bold'>Hang on, your transaction is processing</p>
        </div>
    );
}

export default Loading;