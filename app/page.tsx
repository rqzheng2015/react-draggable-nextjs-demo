import RightSidebar from '@/app/components/right_sidebar'
import FooterBar from '@/app/components/footer_bar'
import CanvasContainer from '@/app/components/canvas_container'

export default function Home() {
  return (
    <div className={'w-[100vw] h-[100vh] flex overflow-hidden bg-[#EDEFF3]'}>
      <div className={'flex flex-1 flex-col'}>
        <CanvasContainer />
        <FooterBar />
      </div>
      <RightSidebar />
    </div>
  )
}
