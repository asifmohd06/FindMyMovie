const data = torrents
const title = name
const type = document.getElementById('type')
const size = document.getElementById('size')
const seeds = document.getElementById('seeds')
const magnet = document.getElementById('torrent__magnet')
const torrentFile = document.getElementById('torrent__file')

// const btn720=document.getElementById('720p')
// const btn1080=document.getElementById('1080p')

const tbtn = document.getElementsByClassName('torrentbtn')
tbtn[0].classList.add('selectedbtn')



// function change(e) {
//     type.innerHTML = 'web'
//     size.innerHTML = '3 GB'
//     seeds.innerHTML = '108'
//     peers.innerHTML = '30'

// }

for (let btn of tbtn) {

    btn.addEventListener('click', function (e) {
        const hash = e.target.dataset.set
        for (let btn of tbtn) {
            btn.classList.remove('selectedbtn', 'index')

        }
        e.target.classList.add('selectedbtn')
        data.forEach(element => {
            if (element.hash == hash) {
                type.innerHTML = element.type
                size.innerHTML = element.size
                seeds.innerHTML = element.seeds

                magnet.innerHTML = `<a class="link__effect" href="magnet:?xt=urn:btih:${element.hash}&dn=${title}-${element.quality}-${element.size}-YTS.MX&tr=http://track.one:1234/announce&tr=udp://track.two:80&tr=udp://open.demonii.com:1337/announce&tr=udp://tracker.openbittorrent.com:80&tr=udp://tracker.coppersurfer.tk:6969&tr=udp://glotorrents.pw:6969/announce&tr=udp://tracker.opentrackr.org:1337/announce&tr=udp://torrent.gresille.org:80/announce&tr=udp://p4p.arenabg.com:1337&tr=udp://tracker.leechers-paradise.org:6969"><div class="download__btn ">Magnet</div></a>`

                torrentFile.innerHTML = `<a class="link__effect" href="https://yts.mx/torrent/download/${element.hash}" rel="nofollow" title="Download  ${title} ${element.quality} Torrent"><div class="download__btn ">File</div></a>`
            }
        });

    })
}