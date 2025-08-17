const mongoose = require('mongoose');

// Test MongoDB connection
async function testMongoDB() {
  try {
    console.log('Testing MongoDB connection...');
    await mongoose.connect('mongodb://localhost:27017/parking-system');
    console.log('✅ MongoDB connected successfully!');
    
    // Test creating a simple document
    const TestSchema = new mongoose.Schema({ name: String });
    const TestModel = mongoose.model('Test', TestSchema);
    
    const testDoc = new TestModel({ name: 'test' });
    await testDoc.save();
    console.log('✅ Document saved successfully!');
    
    // Clean up
    await TestModel.deleteOne({ name: 'test' });
    console.log('✅ Test document cleaned up!');
    
    await mongoose.disconnect();
    console.log('✅ MongoDB disconnected!');
    
  } catch (error) {
    console.error('❌ MongoDB test failed:', error.message);
  }
}

testMongoDB();
