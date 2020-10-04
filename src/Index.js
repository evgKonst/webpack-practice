import Post from './Post'
import './styles/style.css'
import webpackImg from './assets/webpack.png'

const post = new Post('Webpack practice', webpackImg)

console.log(`>>>>`, post.toString())
