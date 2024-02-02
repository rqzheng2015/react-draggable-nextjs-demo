interface ICanvasContainerProps {}

export default function CanvasContainer(props: ICanvasContainerProps) {
  return (
    <div className={'flex flex-1 p-[16px] items-center justify-center'}>
      <div className={'w-[375px] bg-white h-full flex items-center justify-center p-[16px]'}>
        <p className={'text-[20px]'}>{`This is project's home page.`}</p>
      </div>
    </div>
  )
}
