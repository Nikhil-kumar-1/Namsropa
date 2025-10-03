const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Wishlist = require('../model/Wishlist');

// ✅ Get user's wishlist
router.get('/', auth, async (req, res) => {
  try {
    console.log('Fetching wishlist for user:', req.user.id);
    
    let wishlist = await Wishlist.findOne({ user: req.user.id })
      .populate('items.product')
      .exec();

    if (!wishlist) {
      console.log('No wishlist found, creating new one');
      wishlist = new Wishlist({ 
        user: req.user.id, 
        items: [] 
      });
      await wishlist.save();
    }
    
    console.log('Wishlist found with items:', wishlist.items.length);
    res.json({ 
      success: true, 
      wishlist: {
        _id: wishlist._id,
        user: wishlist.user,
        items: wishlist.items,
        createdAt: wishlist.createdAt,
        updatedAt: wishlist.updatedAt
      }
    });
  } catch (error) {
    console.error('Error fetching wishlist:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error while fetching wishlist',
      error: error.message 
    });
  }
});

// ✅ Add item to wishlist
router.post('/add', auth, async (req, res) => {
  try {
    const { productId } = req.body;
    
    console.log('Adding to wishlist - User:', req.user.id, 'Product:', productId);
    
    if (!productId) {
      return res.status(400).json({ 
        success: false, 
        message: 'Product ID is required' 
      });
    }

    // Validate productId format
    if (typeof productId !== 'string' || productId.length !== 24) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid product ID format' 
      });
    }

    let wishlist = await Wishlist.findOne({ user: req.user.id });
    
    if (!wishlist) {
      console.log('Creating new wishlist for user');
      wishlist = new Wishlist({ 
        user: req.user.id, 
        items: [{ product: productId }] 
      });
    } else {
      // Check if product already exists in wishlist
      const existingItem = wishlist.items.find(
        item => item.product.toString() === productId
      );
      
      if (existingItem) {
        console.log('Product already in wishlist');
        return res.status(400).json({ 
          success: false, 
          message: 'Product already in wishlist' 
        });
      }
      
      console.log('Adding new product to existing wishlist');
      wishlist.items.push({ product: productId });
    }
    
    await wishlist.save();
    await wishlist.populate('items.product');
    
    console.log('Product added to wishlist successfully');
    res.json({ 
      success: true, 
      message: 'Product added to wishlist successfully',
      wishlist: {
        _id: wishlist._id,
        user: wishlist.user,
        items: wishlist.items,
        createdAt: wishlist.createdAt,
        updatedAt: wishlist.updatedAt
      }
    });
  } catch (error) {
    console.error('Error adding to wishlist:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error while adding to wishlist',
      error: error.message 
    });
  }
});

// ✅ Remove item from wishlist
router.delete('/remove/:productId', auth, async (req, res) => {
  try {
    const { productId } = req.params;
    
    console.log('Removing from wishlist - User:', req.user.id, 'Product:', productId);

    if (!productId || productId === 'undefined') {
      return res.status(400).json({ 
        success: false, 
        message: 'Valid product ID is required' 
      });
    }

    const wishlist = await Wishlist.findOne({ user: req.user.id });
    
    if (!wishlist) {
      console.log('Wishlist not found for user');
      return res.status(404).json({ 
        success: false, 
        message: 'Wishlist not found' 
      });
    }
    
    const initialLength = wishlist.items.length;
    wishlist.items = wishlist.items.filter(
      item => item.product.toString() !== productId
    );
    
    if (wishlist.items.length === initialLength) {
      console.log('Product not found in wishlist');
      return res.status(404).json({ 
        success: false, 
        message: 'Product not found in wishlist' 
      });
    }
    
    await wishlist.save();
    await wishlist.populate('items.product');
    
    console.log('Product removed from wishlist successfully');
    res.json({ 
      success: true, 
      message: 'Product removed from wishlist successfully',
      wishlist: {
        _id: wishlist._id,
        user: wishlist.user,
        items: wishlist.items,
        createdAt: wishlist.createdAt,
        updatedAt: wishlist.updatedAt
      }
    });
  } catch (error) {
    console.error('Error removing from wishlist:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error while removing from wishlist',
      error: error.message 
    });
  }
});

// ✅ Check if product is in wishlist
router.get('/check/:productId', auth, async (req, res) => {
  try {
    const { productId } = req.params;
    
    console.log('Checking wishlist status - User:', req.user.id, 'Product:', productId);

    // Validate productId
    if (!productId || productId === 'undefined' || productId.length !== 24) {
      console.log('Invalid product ID format');
      return res.json({ 
        success: true, 
        isInWishlist: false 
      });
    }

    const wishlist = await Wishlist.findOne({ user: req.user.id });
    
    if (!wishlist) {
      console.log('No wishlist found for user');
      return res.json({ 
        success: true, 
        isInWishlist: false 
      });
    }
    
    const isInWishlist = wishlist.items.some(
      item => item.product && item.product.toString() === productId
    );
    
    console.log('Wishlist check result:', isInWishlist);
    res.json({ 
      success: true, 
      isInWishlist 
    });
  } catch (error) {
    console.error('Error checking wishlist:', error);
    // Don't send 500 error for check route, just return false
    res.json({ 
      success: true, 
      isInWishlist: false 
    });
  }
});

// ✅ Clear entire wishlist
router.delete('/clear', auth, async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({ user: req.user.id });
    
    if (!wishlist) {
      return res.status(404).json({ 
        success: false, 
        message: 'Wishlist not found' 
      });
    }
    
    wishlist.items = [];
    await wishlist.save();
    
    res.json({ 
      success: true, 
      message: 'Wishlist cleared successfully',
      wishlist: {
        _id: wishlist._id,
        user: wishlist.user,
        items: wishlist.items,
        createdAt: wishlist.createdAt,
        updatedAt: wishlist.updatedAt
      }
    });
  } catch (error) {
    console.error('Error clearing wishlist:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error while clearing wishlist',
      error: error.message 
    });
  }
});

module.exports = router;