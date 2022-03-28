import { FC } from 'react'
import ReactFullpage from '@fullpage/react-fullpage'

import { SearchBar } from 'shared/components'

import { ILandingPage } from './LandingPage.types'
import { Wrapper, SectionWrapper, SectionItem } from './LandingPage.styles'

const LandingPage: FC<ILandingPage> = ({ copy }) => {
  // const [isModalOpen, setIsModalOpen] = useState(false)
  // const [isDeclarationChecked, setIsDeclarationChecked] = useState(false)

  // const history = useHistory()
  // const handleModalOpen = () => {
  //   setIsModalOpen(true)
  // }

  // const handleSubmit = () => {
  //   history.push(`${PageUrl.Base}/${PageUrl.PersonalDetails}/${PageUrl.About}`)
  // }

  // const pluginWrapper = () => {
  //   require('./statics/fullpage.scrollHorizontally.min');
  // }

  const anchors = ['firstPage', 'secondPage', 'thirdPage']

  const Fullpage = () => (
    <ReactFullpage
      //fullpage options
      licenseKey={'YOUR_KEY_HERE'}
      scrollingSpeed={1000} /* Options here */
      dragAndMove={true}
      // pluginWrapper={pluginWrapper}
      scrollHorizontally={true}
      scrollHorizontallyKey={'YOUR KEY HERE'}
      anchors={anchors}
      navigation
      navigationTooltips={anchors}
      sectionsColor={['#9ffcb8', '#fc9fe3', '#9ffcf3', '#9ffcb8']}
      scrollOverflow={true}
      normalScrollElements="#thirdpage"
      render={({ state, fullpageApi }) => {
        return (
          <ReactFullpage.Wrapper>
            <div className="section">
              <Wrapper>
                <SectionWrapper>
                  <SectionItem>
                    <h1>5 Rules to drink by! [logo]</h1>
                  </SectionItem>
                  <SectionItem>
                    Quick drinking rules for movies to help you push through the
                    films with low scores on rotten tomatoes (or just to add
                    some fun for the good ones :D)
                  </SectionItem>
                </SectionWrapper>
              </Wrapper>
            </div>
            <div className="section">
              <p>Generic Rules / Non Movies</p>
            </div>
            <div className="section">
              <SearchBar id="thirdpage" placeholder="Search movies" />
            </div>
            <div className="section">
              <p>Submit movie rules</p>
            </div>
          </ReactFullpage.Wrapper>
        )
      }}
    />
  )

  return <>{Fullpage()}</>
}

export default LandingPage
