// Sample posts data
const samplePosts = [
    {
        id: 1,
        author: "Tech Innovator",
        username: "@techinnovator",
        time: "2h",
        text: "Just launched my new project! 🚀 Check out this amazing web app built with vanilla JavaScript. The possibilities are endless! #WebDev #JavaScript",
        likes: 245,
        retweets: 67,
        replies: 34
    },
    {
        id: 2,
        author: "Design Maestro",
        username: "@designmaestro",
        time: "4h",
        text: "The key to great UI/UX is simplicity. Less is more. Clean, minimal designs always win. 🎨✨",
        likes: 532,
        retweets: 123,
        replies: 89
    },
    {
        id: 3,
        author: "Code Wizard",
        username: "@codewizard",
        time: "6h",
        text: "Pro tip: Always write clean, readable code. Your future self will thank you! 💻 #CodingBestPractices",
        likes: 891,
        retweets: 234,
        replies: 156
    },
    {
        id: 4,
        author: "Startup Guru",
        username: "@startupguru",
        time: "8h",
        text: "Building in public is the best way to grow. Share your journey, connect with others, and learn from the community! 🌟",
        likes: 1203,
        retweets: 456,
        replies: 234
    },
    {
        id: 5,
        author: "AI Enthusiast",
        username: "@aienthusiast",
        time: "10h",
        text: "The future of AI is here and it's incredible! Can't wait to see what we build next. 🤖",
        likes: 678,
        retweets: 189,
        replies: 112
    }
];

// State management
let posts = [...samplePosts];
let nextPostId = samplePosts.length + 1;

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    renderPosts();
    setupEventListeners();
});

// Render all posts
function renderPosts() {
    const postsFeed = document.getElementById('postsFeed');
    postsFeed.innerHTML = '';
    
    posts.forEach(post => {
        const postElement = createPostElement(post);
        postsFeed.appendChild(postElement);
    });
}

// Create a post element
function createPostElement(post) {
    const postDiv = document.createElement('div');
    postDiv.className = 'post';
    postDiv.dataset.postId = post.id;
    
    postDiv.innerHTML = `
        <div class="avatar">
            <i class="fas fa-user-circle"></i>
        </div>
        <div class="post-content">
            <div class="post-header">
                <span class="post-author">${escapeHtml(post.author)}</span>
                <span class="post-username">${escapeHtml(post.username)}</span>
                <span class="post-time">· ${escapeHtml(post.time)}</span>
            </div>
            <div class="post-text">${escapeHtml(post.text)}</div>
            <div class="post-actions-bar">
                <button class="post-action reply-btn" title="Reply">
                    <i class="far fa-comment"></i>
                    <span class="action-count">${formatCount(post.replies)}</span>
                </button>
                <button class="post-action retweet-btn ${post.retweeted ? 'retweeted' : ''}" title="Retweet">
                    <i class="fas fa-retweet"></i>
                    <span class="action-count">${formatCount(post.retweets)}</span>
                </button>
                <button class="post-action like-btn ${post.liked ? 'liked' : ''}" title="Like">
                    <i class="${post.liked ? 'fas' : 'far'} fa-heart"></i>
                    <span class="action-count">${formatCount(post.likes)}</span>
                </button>
                <button class="post-action share-btn" title="Share">
                    <i class="fas fa-share"></i>
                </button>
            </div>
        </div>
    `;
    
    // Add event listeners to post actions
    const likeBtn = postDiv.querySelector('.like-btn');
    const retweetBtn = postDiv.querySelector('.retweet-btn');
    const replyBtn = postDiv.querySelector('.reply-btn');
    const shareBtn = postDiv.querySelector('.share-btn');
    
    likeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleLike(post.id);
    });
    
    retweetBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleRetweet(post.id);
    });
    
    replyBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        handleReply(post.id);
    });
    
    shareBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        handleShare(post.id);
    });
    
    return postDiv;
}

// Setup event listeners
function setupEventListeners() {
    const submitBtn = document.getElementById('submitPost');
    const postInput = document.getElementById('postInput');
    
    // Enable/disable submit button based on input
    postInput.addEventListener('input', () => {
        submitBtn.disabled = postInput.value.trim().length === 0;
    });
    
    // Submit new post
    submitBtn.addEventListener('click', () => {
        createNewPost();
    });
    
    // Submit on Ctrl/Cmd + Enter
    postInput.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            createNewPost();
        }
    });
    
    // Follow button functionality
    setupFollowButtons();
}

// Create a new post
function createNewPost() {
    const postInput = document.getElementById('postInput');
    const text = postInput.value.trim();
    
    if (text.length === 0) return;
    
    const newPost = {
        id: nextPostId++,
        author: "You",
        username: "@yourhandle",
        time: "now",
        text: text,
        likes: 0,
        retweets: 0,
        replies: 0,
        liked: false,
        retweeted: false
    };
    
    posts.unshift(newPost);
    postInput.value = '';
    document.getElementById('submitPost').disabled = true;
    
    // Add the new post to the feed
    const postsFeed = document.getElementById('postsFeed');
    const postElement = createPostElement(newPost);
    postsFeed.insertBefore(postElement, postsFeed.firstChild);
}

// Toggle like on a post
function toggleLike(postId) {
    const post = posts.find(p => p.id === postId);
    if (!post) return;
    
    post.liked = !post.liked;
    post.likes += post.liked ? 1 : -1;
    
    updatePostInDOM(postId);
}

// Toggle retweet on a post
function toggleRetweet(postId) {
    const post = posts.find(p => p.id === postId);
    if (!post) return;
    
    post.retweeted = !post.retweeted;
    post.retweets += post.retweeted ? 1 : -1;
    
    updatePostInDOM(postId);
}

// Handle reply to a post
function handleReply(postId) {
    const post = posts.find(p => p.id === postId);
    if (!post) return;
    
    const postInput = document.getElementById('postInput');
    postInput.value = `@${post.username.substring(1)} `;
    postInput.focus();
}

// Handle share
function handleShare(postId) {
    const post = posts.find(p => p.id === postId);
    if (!post) return;
    
    // In a real app, this would open a share dialog
    alert('Share functionality: In a real app, this would open sharing options!');
}

// Update a post in the DOM
function updatePostInDOM(postId) {
    const post = posts.find(p => p.id === postId);
    if (!post) return;
    
    const postElement = document.querySelector(`[data-post-id="${postId}"]`);
    if (!postElement) return;
    
    const newPostElement = createPostElement(post);
    postElement.replaceWith(newPostElement);
}

// Setup follow buttons
function setupFollowButtons() {
    const followBtns = document.querySelectorAll('.follow-btn');
    followBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            if (btn.classList.contains('following')) {
                btn.classList.remove('following');
                btn.textContent = 'Follow';
            } else {
                btn.classList.add('following');
                btn.textContent = 'Following';
            }
        });
    });
}

// Utility functions
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function formatCount(count) {
    if (count === 0) return '';
    if (count < 1000) return count.toString();
    if (count < 1000000) return (count / 1000).toFixed(1).replace('.0', '') + 'K';
    return (count / 1000000).toFixed(1).replace('.0', '') + 'M';
}

// Add some interactivity to navigation items
document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
        item.classList.add('active');
    });
});

// Initial state - disable submit button
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('submitPost').disabled = true;
});
