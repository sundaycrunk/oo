import axios from "axios"
import React from "react"
import './App.css'

// const baseURL = "https://jsonplaceholder.typicode.com/posts/1";

// ok perfect. this gives you the cors error.
// const baseURL =
// "https://learning.oreilly.com/api/v1/book/9780137611676/chapter/nje1_01_05_02.html"
const baseURL = "https://learning.oreilly.com/api/v1/book/9780137611676/"

function convertNumToTime(number) {
    // Check sign of given number
    var sign = (number >= 0) ? 1 : -1;

    // Set positive value of number of sign negative
    number = number * sign;

    // Separate the int from the decimal part
    var hour = Math.floor(number);
    var decpart = number - hour;

    var min = 1 / 60;
    // Round to nearest minute
    decpart = min * Math.round(decpart / min);

    var minute = Math.floor(decpart * 60) + '';

    // Add padding if need
    if (minute.length < 2) {
    minute = '0' + minute;
    }

    // Add Sign in final result
    sign = sign === 1 ? '' : '-';

    // Concate hours and minutes
    const time = sign + hour + ':' + minute;

    return time;
}


class App extends React.Component {
  constructor(props) {
      super(props)

      this.state = {
          initbase: "https://learning.oreilly.com/videos/",
           data: [],
           bookey: '',
           webname: '',
           weburl: ''

      }
  }

  // const [data, setData] = React.useState(null)
  // const [chapters, setChapters] = React.useState(null)
  // const [webUrl, setwebUrl] = React.useState(null)
  // const bookkey = baseURL.split("/")[6]
  // const basey =
  // const initbase = "https://learning.oreilly.com/videos/"

  // React.useEffect(() => {
  //   axios.get(baseURL).then((response) => {
  //     setwebUrl(response.data.web_url.split("/"))
  //     console.log(response.data.web_url.split("/"))
  //
  //   })
  // }, [])

  // const webshit = webUrl.split("/")
  componentDidMount() {

    axios.get(baseURL).then((response) => {
      this.setState({bookey: response.data.web_url.split("/")[6]})
      this.setState({webname: response.data.web_url.split("/")[5] + "/"})
      console.log(response.data.web_url.split("/"))
    })

    axios.get(baseURL + "toc").then((response) => {
      this.setState({data: response.data})
      console.log(response.data)
    })

  }



  // React.useEffect(() => {
  //   axios.get(post.chapter_list).then((response) => {
  //     setPost(response.data);
  //     console.log(response)
  //   })
  // }, [])


// href has to be like this
// https://learning.oreilly.com/videos/react-zero-to/9780137611676/9780137611676-lrmw_01_02_03/
// "https://learning.oreilly.com/library/view/react-zero-to/9780137611676/lrmw_01_02_03"

// <p>i could make a component that is designed to go into one of the c.url things,
// and get the web url. just link to that mothafuckaaa....</p>
// <p>so it could be a button onClick instead of an anchor</p>
render() {
  const { webname, bookey } = this.state
  return (
    <div id="App">
    {
        this.state.data.map((item, index) => {
            return ( <div>
                  <h4>{item.label}</h4>
                  { item.children.map((c, i) => <div className="child">
                  <p className="length">{convertNumToTime(c.minutes_required)}</p>
                  <a href={this.state.initbase + webname + bookey + "/" + bookey + "-" + c.href.split(".")[0]} className="label">{c.label}</a>
                  </div>)}
                </div>
              )
            })
    }
    </div>
  )
}
}

export default App
