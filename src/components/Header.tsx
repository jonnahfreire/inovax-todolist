import Logo from '../assets/logo.png';
import tw from 'tailwind-styled-components';

const Header = tw.div`
  flex
  w-screen
  h-140
  p-4
  shadow-md
`
const HeaderContent = tw.div`
  flex  
  flex-row
  items-center
  justify-start
`
const VerticalDivider = tw.div`
  border
  mr-2
  w-[.2rem]
  h-full
  bg-[#1b1d37]
`
const HeaderTitleContent = tw.div`
  flex
  flex-col
`

export const AppHeader = () => {
    return (
        <Header>
            <HeaderContent>
                <img src={Logo} alt='' className='mr-2' width={70} />
                <VerticalDivider />

                <HeaderTitleContent>
                    <p className='font-bold text-[#1b1d37]'>TO DO LIST</p>
                    <p className='font-regular text-sm text-[#1b1d37]'>Teste de capacidade técnica</p>
                </HeaderTitleContent>
            </HeaderContent>
        </Header>
    )
}