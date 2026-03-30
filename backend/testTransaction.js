const supabase = require('./config/supabaseClient');

async function checkTables() {
  try {
    console.log('Checking transactions table...');
    const { data: transactions, error: txError } = await supabase
      .from('transactions')
      .select('*', { count: 'exact' });

    if (txError) {
      console.error('❌ Error checking transactions:', txError);
    } else {
      console.log(`✅ Transactions table: ${transactions.length} records found`);
    }

    // Check if we can insert without booking_id (test if FK is the issue)
    console.log('\nTrying to insert transaction WITHOUT booking_id...');
    const { data: result, error: insertError } = await supabase
      .from('transactions')
      .insert([{
        booking_id: null,  // Try null first
        passenger_email: 'nulltest@example.com',
        passenger_name: 'Null Test',
        amount: 100,
        status: 'test'
      }])
      .select();

    if (insertError) {
      console.error('❌ Error:', insertError.message);
      console.log('💡 This confirms the foreign key issue - bookings must exist first');
    } else {
      console.log('✅ Insert without booking_id worked');
    }
  } catch (err) {
    console.error('❌ Error:', err.message);
  }
}

checkTables();
