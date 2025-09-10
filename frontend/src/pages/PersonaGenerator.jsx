import React, { useState } from "react"
import { motion } from "framer-motion"

const PersonaGenerator = () => {
  const [personas, setPersonas] = useState([])
  const [loading, setLoading] = useState(false)

  const handleGeneration = () => {
    setLoading(true)
    
    setTimeout(() => {
      const demoPersonas = [
        {
          id: 1,
          name: "Sarah Chen",
          age: 32,
          location: "San Francisco, CA",
          occupation: "Software Engineer",
          interests: ["Technology", "Sustainability", "Travel"],
          pain_points: ["Work-life balance", "Time management"]
        },
        {
          id: 2,
          name: "Marcus Johnson", 
          age: 28,
          location: "Austin, TX",
          occupation: "Marketing Manager",
          interests: ["Digital Marketing", "Fitness", "Music"],
          pain_points: ["Budget constraints", "ROI measurement"]
        }
      ]
      setPersonas(demoPersonas)
      setLoading(false)
    }, 2000)
  }

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          👥 Persona Generator
        </h1>
        <p className="text-xl text-gray-600">
          AI-Generated User Personas for Better Targeting
        </p>
      </motion.div>

      <div className="text-center mb-8">
        <button
          onClick={handleGeneration}
          disabled={loading}
          className="btn-primary"
        >
          {loading ? "Generating..." : "✨ Generate Personas"}
        </button>
      </div>

      <div className="space-y-6">
        {personas.map((persona) => (
          <motion.div
            key={persona.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card"
          >
            <div className="flex items-start space-x-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                {persona.name.split(" ").map(n => n[0]).join("")}
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {persona.name}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">
                      <span className="font-medium">Age:</span> {persona.age}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-medium">Location:</span> {persona.location}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-medium">Occupation:</span> {persona.occupation}
                    </p>
                  </div>
                  <div>
                    <div className="mb-2">
                      <span className="font-medium text-gray-700">Interests:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {persona.interests.map((interest, idx) => (
                          <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                            {interest}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default PersonaGenerator
