<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class UserStatusUpdateEmail extends Mailable
{
    use Queueable, SerializesModels;

    public $user;
    public $status;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($user, $status)
    {
        $this->user = $user;
        $this->status = $status;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->subject('Your Application Status')
                    ->view('emails.user-status-update')
                    ->with([
                        'username' => $this->user->username,
                        'status' => $this->status,
                    ]);
    }
}
