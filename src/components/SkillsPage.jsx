import { useState } from 'react';
import { 
  Search, 
  Filter, 
  BookOpen, 
  Clock, 
  Star, 
  Users, 
  TrendingUp,
  Play,
  Target,
  Award,
  ChevronRight,
  Zap,
  Brain,
  Eye,
  Download
} from 'lucide-react';

export default function SkillsPage({ onGenerateExam, onBack }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [sortBy, setSortBy] = useState('popular');

  const categories = [
    { id: 'all', name: 'All Categories', count: 45 },
    { id: 'machine-learning', name: 'Machine Learning', count: 12 },
    { id: 'deep-learning', name: 'Deep Learning', count: 8 },
    { id: 'nlp', name: 'Natural Language Processing', count: 6 },
    { id: 'computer-vision', name: 'Computer Vision', count: 7 },
    { id: 'data-science', name: 'Data Science', count: 9 },
    { id: 'ai-ethics', name: 'AI Ethics', count: 3 }
  ];

  const skills = [
    {
      id: 1,
      title: 'Machine Learning Fundamentals',
      description: 'Master the core concepts of supervised and unsupervised learning...',
      category: 'machine-learning',
      difficulty: 'Intermediate',
      duration: '2-3 hours',
      topics: ['Supervised Learning', 'Unsupervised Learning', 'Model Evaluation', 'Feature Engineering'],
      popularity: 95,
      enrolled: 12500,
      rating: 4.8,
      image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=400',
      progress: 75,
      isEnrolled: true
    },
    {
      id: 2,
      title: 'Deep Neural Networks',
      description: 'Dive deep into neural network architectures...',
      category: 'deep-learning',
      difficulty: 'Expert',
      duration: '4-5 hours',
      topics: ['Neural Networks', 'Backpropagation', 'CNN', 'RNN', 'Optimization'],
      popularity: 88,
      enrolled: 8900,
      rating: 4.9,
      image: 'https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg?auto=compress&cs=tinysrgb&w=400',
      progress: 45,
      isEnrolled: true
    }
    // ...other skills
  ];

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Novice': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Expert': return 'bg-red-100 text-red-800';
      case 'Master': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Search, filter, sorting
  const filteredSkills = skills.filter(skill => {
    const matchesSearch = skill.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         skill.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || skill.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'all' || skill.difficulty === selectedDifficulty;
    
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  const sortedSkills = [...filteredSkills].sort((a, b) => {
    switch (sortBy) {
      case 'popular': return b.popularity - a.popularity;
      case 'rating': return b.rating - a.rating;
      case 'enrolled': return b.enrolled - a.enrolled;
      case 'alphabetical': return a.title.localeCompare(b.title);
      default: return 0;
    }
  });

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* ========= HEADER WITH BACK BUTTON ========= */}
      <div className="bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8 py-6">
        <div className="max-w-7xl mx-auto">

          <div className="flex items-center gap-4 mb-4">
            <button
              onClick={onBack}
              className="text-gray-600 hover:text-gray-900 transition-colors text-2xl"
            >
              ←
            </button>

            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Skills Library
            </h1>
          </div>

          <p className="text-gray-600 mt-1">
            Explore and master AI skills with personalized learning paths
          </p>

        </div>
      </div>

      {/* ========= MAIN PAGE CONTENT ========= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* ---- Sidebar ---- */}
          <div className="lg:w-80 space-y-6">

            {/* Search */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Search Skills</h3>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search skills..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent outline-none"
                />
              </div>
            </div>

            {/* Categories */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Categories</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-colors ${
                      selectedCategory === category.id
                        ? 'bg-violet-50 text-violet-700 border border-violet-200'
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <span className="font-medium">{category.name}</span>
                    <span className="text-sm text-gray-500">{category.count}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Difficulty */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Difficulty Level</h3>
              <div className="space-y-2">
                {['all', 'Novice', 'Intermediate', 'Expert', 'Master'].map((difficulty) => (
                  <button
                    key={difficulty}
                    onClick={() => setSelectedDifficulty(difficulty)}
                    className={`w-full flex items-center p-3 rounded-lg text-left transition-colors ${
                      selectedDifficulty === difficulty
                        ? 'bg-violet-50 text-violet-700 border border-violet-200'
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <span className="font-medium">
                      {difficulty === 'all' ? 'All Levels' : difficulty}
                    </span>
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* ---- Main Content ---- */}
          <div className="flex-1">

            {/* Sort Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-4">
                <span className="text-gray-600">
                  {sortedSkills.length} skill{sortedSkills.length !== 1 ? "s" : ""} found
                </span>
              </div>

              <div className="flex items-center gap-3">
                <label className="text-sm font-medium text-gray-700">Sort by:</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2"
                >
                  <option value="popular">Most Popular</option>
                  <option value="rating">Highest Rated</option>
                  <option value="enrolled">Most Enrolled</option>
                  <option value="alphabetical">Alphabetical</option>
                </select>
              </div>
            </div>

            {/* Skills Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {sortedSkills.map((skill) => (
                <div key={skill.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all">

                  {/* Image Section */}
                  <div className="h-48 relative">
                    <img 
                      src={skill.image} 
                      alt={skill.title}
                      className="w-full h-full object-cover opacity-60"
                    />
                    <div className="absolute top-4 right-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(skill.difficulty)}`}>
                        {skill.difficulty}
                      </span>
                    </div>
                    <div className="absolute bottom-4 left-4 flex items-center gap-2 text-white text-sm">
                      <Clock className="w-4 h-4" />
                      <span>{skill.duration}</span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6">

                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-lg font-bold text-gray-900">{skill.title}</h3>
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span>{skill.rating}</span>
                      </div>
                    </div>

                    <p className="text-gray-600 text-sm mb-4 leading-relaxed line-clamp-2">
                      {skill.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {skill.topics.slice(0, 3).map((topic, i) => (
                        <span key={i} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                          {topic}
                        </span>
                      ))}
                      {skill.topics.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                          +{skill.topics.length - 3} more
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span>{skill.enrolled.toLocaleString()} enrolled</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <TrendingUp className="w-4 h-4" />
                        <span>{skill.popularity}% popularity</span>
                      </div>
                    </div>

                    {skill.isEnrolled && (
                      <div className="mb-4">
                        <div className="flex items-center justify-between text-sm mb-2">
                          <span className="text-gray-600">Progress</span>
                          <span className="text-gray-900 font-medium">{skill.progress}%</span>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full">
                          <div 
                            className="h-2 bg-violet-600 rounded-full"
                            style={{ width: `${skill.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    )}

                    <div className="flex gap-2">
                      <button 
                        onClick={() => onGenerateExam(skill)}
                        className="flex-1 bg-violet-600 hover:bg-violet-700 text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2"
                      >
                        <Zap className="w-4 h-4" />
                        Generate Exam
                      </button>

                      <button className="p-2 border border-gray-300 hover:bg-gray-50 rounded-lg">
                        <Eye className="w-4 h-4 text-gray-600" />
                      </button>
                    </div>

                  </div>
                </div>
              ))}
            </div>

            {sortedSkills.length === 0 && (
              <div className="text-center py-12">
                <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No skills found</h3>
                <p className="text-gray-600">Try adjusting your filters</p>
              </div>
            )}

          </div>
        </div>
      </div>

    </div>
  );
}
